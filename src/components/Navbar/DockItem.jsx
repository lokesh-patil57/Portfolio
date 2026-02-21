import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── Spring configs ───────────────────────────────────────────────────────────
const SCALE_SPRING = { stiffness: 380, damping: 22, mass: 0.6 };
const TILT_SPRING = { stiffness: 300, damping: 28, mass: 0.5 };
const LIFT_SPRING = { stiffness: 350, damping: 26, mass: 0.5 };
const MAGNET_SPRING = { stiffness: 260, damping: 24, mass: 0.7 };

const REACH = 130; // px radius of cursor influence
const MAX_SCALE = 1.8; // scale at cursor center (normal)
const MAX_SCALE_COMPACT = 1.45; // scale for compact (navbar) mode
const MAX_TILT = 14; // deg
const MAX_LIFT = -16; // px (negative = up)
const MAX_LIFT_COMPACT = -10; // px for compact mode
const MAX_MAGNET = 9; // px
const MAX_MAGNET_COMPACT = 5; // px for compact mode

/**
 * DockItem — a single animated macOS-dock-style button.
 *
 * Props
 * ─────
 *   item        { id, label, icon, href }
 *   isActive    boolean
 *   t           theme-token object
 *   onClick     () => void
 *   cursor      { x, y }  — shared cursor coordinates from parent dock
 *   dockRef     ref to the dock container (unused here, kept for API compat)
 *   index       number
 */
const DockItem = ({
  item,
  isActive,
  t,
  onClick,
  cursor,
  tooltipBelow = false,
  compact = false,
}) => {
  const maxScale = compact ? MAX_SCALE_COMPACT : MAX_SCALE;
  const maxLift = compact ? MAX_LIFT_COMPACT : MAX_LIFT;
  const maxMagnet = compact ? MAX_MAGNET_COMPACT : MAX_MAGNET;
  const itemRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // ── Raw motion values ───────────────────────────────────────────────────────
  const rawScale = useMotionValue(1);
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const rawLift = useMotionValue(0);
  const rawMagX = useMotionValue(0);
  const rawMagY = useMotionValue(0);

  // ── Sprung (smooth) motion values ──────────────────────────────────────────
  const scale = useSpring(rawScale, SCALE_SPRING);
  const tiltX = useSpring(rawTiltX, TILT_SPRING);
  const tiltY = useSpring(rawTiltY, TILT_SPRING);
  const lift = useSpring(rawLift, LIFT_SPRING);
  const magX = useSpring(rawMagX, MAGNET_SPRING);

  // ── Derived glow opacity ────────────────────────────────────────────────────
  const glowOpacity = useTransform(scale, [1, maxScale], [0, 1]);

  // ── Update physics from cursor position ────────────────────────────────────
  useEffect(() => {
    if (!itemRef.current) return;
    const { x: cursorX, y: cursorY } = cursor;

    const rect = itemRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = cursorX - cx;
    const dy = cursorY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (cursorX < -1000) {
      // Cursor left the dock — reset
      rawScale.set(1);
      rawTiltX.set(0);
      rawTiltY.set(0);
      rawLift.set(0);
      rawMagX.set(0);
      rawMagY.set(0);
      return;
    }

    // Scale — smoothly decays with distance
    const proximity = Math.max(0, 1 - dist / REACH);
    rawScale.set(1 + (maxScale - 1) * Math.pow(proximity, 1.3));

    // 3-D tilt
    const tiltFactor = Math.max(0, 1 - dist / (REACH * 1.7));
    rawTiltX.set((-dy / (rect.height / 2)) * MAX_TILT * tiltFactor);
    rawTiltY.set((dx / (rect.width / 2)) * MAX_TILT * tiltFactor);

    // Upward lift
    rawLift.set(maxLift * Math.pow(proximity, 1.1));

    // Magnetic pull (only inside close radius)
    const magFactor = Math.max(0, 1 - dist / (REACH * 0.85));
    rawMagX.set(dx * magFactor * (maxMagnet / (REACH * 0.85)));
    rawMagY.set(dy * magFactor * (maxMagnet / (REACH * 0.85)));
  }, [
    cursor,
    rawLift,
    rawMagX,
    rawMagY,
    rawScale,
    rawTiltX,
    rawTiltY,
    maxScale,
    maxLift,
    maxMagnet,
  ]);

  // ── Click ripple ───────────────────────────────────────────────────────────
  const handleClick = (e) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      620,
    );
    onClick?.();
  };

  return (
    <div
      ref={itemRef}
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: "600px" }}
    >
      {/* ── Glow halo ──────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          opacity: glowOpacity,
          borderRadius: "16px",
          boxShadow: isActive
            ? `0 0 30px 10px ${t.textActive}55, 0 0 65px 20px ${t.textActive}1a`
            : `0 0 24px  8px ${t.textActive}44, 0 0 55px 14px ${t.textActive}18`,
        }}
      />

      {/* ── Main button ────────────────────────────────────────────────────── */}
      <motion.a
        href={item.href}
        onClick={handleClick}
        aria-label={item.label}
        className={`relative flex items-center justify-center cursor-pointer overflow-hidden select-none ${
          compact ? "w-9 h-9 rounded-xl" : "w-14 h-11 rounded-2xl"
        }`}
        style={{
          scale,
          rotateX: tiltX,
          rotateY: tiltY,
          y: lift,
          x: magX,
          transformStyle: "preserve-3d",
          background: isActive ? "transparent" : t.dockItemInactiveBg,
          border: `1px solid ${isActive ? t.dockItemActiveBorder : t.dockItemInactiveBorder}`,
          color: isActive ? t.textActive : t.textSecondary,
          textDecoration: "none",
        }}
        whileTap={{ scale: 0.82 }}
      >
        {/* ── Liquid flow background (active only) ─────────────────────── */}
        {isActive && (
          <>
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{ background: t.dockItemActiveBg }}
            />

            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 w-[200%]"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${t.dockItemActiveBorder} 50%, transparent 100%)`,
                opacity: 0.45,
              }}
            />

            {/* Radial glow drift */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `radial-gradient(circle at 30% 40%, ${t.textActive} 0%, transparent 65%)`,
                  `radial-gradient(circle at 70% 60%, ${t.textActive} 0%, transparent 65%)`,
                  `radial-gradient(circle at 30% 40%, ${t.textActive} 0%, transparent 65%)`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ opacity: 0.18 }}
            />
          </>
        )}

        {/* ── Active indicator dot ──────────────────────────────────────── */}
        {isActive && (
          <motion.span
            layoutId="desktop-dock-active-dot"
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: t.textActive }}
          />
        )}

        {/* ── Ripples ───────────────────────────────────────────────────── */}
        {ripples.map(({ id, x, y }) => (
          <motion.span
            key={id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: x,
              top: y,
              x: "-50%",
              y: "-50%",
              background: `${t.textActive}44`,
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 82, height: 82, opacity: 0 }}
            transition={{ duration: 0.58, ease: "easeOut" }}
          />
        ))}

        {/* ── Icon ──────────────────────────────────────────────────────── */}
        <span className="relative z-10 flex items-center justify-center">
          {item.icon}
        </span>
      </motion.a>

      {/* ── Tooltip ────────────────────────────────────────────────────────── */}
      <motion.div
        className={`absolute left-1/2 pointer-events-none whitespace-nowrap z-50 ${
          tooltipBelow ? "-bottom-11" : "-top-11"
        }`}
        style={{ x: "-50%" }}
        initial={false}
        animate={
          isHovered
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: tooltipBelow ? -5 : 5, scale: 0.88 }
        }
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
      >
        {/* Tiny arrow (top when tooltip is below) */}
        {tooltipBelow && (
          <span
            className="block w-2 h-2 mx-auto -mb-1 rotate-45"
            style={{ background: t.tooltipBg }}
          />
        )}
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold shadow-lg block text-center"
          style={{ background: t.tooltipBg, color: t.tooltipText }}
        >
          {item.label}
        </span>
        {/* Tiny arrow (bottom when tooltip is above) */}
        {!tooltipBelow && (
          <span
            className="block w-2 h-2 mx-auto -mt-1 rotate-45"
            style={{ background: t.tooltipBg }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default DockItem;
