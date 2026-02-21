import { motion } from "framer-motion";

// MobileDockItem — icon-only dock button with liquid flow effect when active
// Props: item ({ id, label, icon, href }), isActive (bool), t (theme tokens), onClick (fn)
const MobileDockItem = ({ item, isActive, t, onClick }) => {
  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      whileTap={{ scale: 0.82 }}
      animate={isActive ? { y: [0, -6, 0] } : { y: 0 }}
      transition={
        isActive
          ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.3 }
      }
      className="relative flex items-center justify-center w-12 h-12 rounded-2xl cursor-pointer overflow-hidden"
      style={{
        background: isActive ? "transparent" : t.dockItemInactiveBg,
        border: `1px solid ${isActive ? t.dockItemActiveBorder : t.dockItemInactiveBorder}`,
        color: isActive ? t.textActive : t.textSecondary,
        textDecoration: "none",
      }}
    >
      {/* ── Liquid flow background (active only) ── */}
      {isActive && (
        <>
          {/* Base coloured fill */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{ background: t.dockItemActiveBg }}
          />

          {/* Shimmer wave sweeping left → right */}
          <motion.div
            className="absolute inset-0 w-[200%]"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${t.dockItemActiveBorder} 50%, transparent 100%)`,
              opacity: 0.45,
            }}
          />

          {/* Radial glow that drifts around */}
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

          {/* Active indicator dot above the button */}
          <motion.span
            layoutId="dock-active-dot"
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: t.textActive }}
          />
        </>
      )}

      {/* Icon — always visible, no label */}
      <span className="relative z-10 flex items-center justify-center">
        {item.icon}
      </span>
    </motion.a>
  );
};

export default MobileDockItem;
