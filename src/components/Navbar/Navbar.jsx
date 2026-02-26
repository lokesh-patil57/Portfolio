import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "../../constants/theme";

// ─── Sub-components ───────────────────────────────────────────────────────────
import ThemeToggle from "./ThemeToggle";
import LiquidCursor from "./LiquidCursor";
import FloatingOrb from "./FloatingOrb";
import MobileDockItem from "./MobileDockItem";
import TabletMenuItem from "./TabletMenuItem";
import DockItem from "./DockItem";
import navItems from "./navItems";

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar = ({ show = true, isDark, setIsDark }) => {
  const [activeItem, setActiveItem] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navRef = useRef(null); // wraps the mobile top-bar for outside-click detection
  const desktopNavRef = useRef(null); // desktop pill (for LiquidCursor)

  // Shared cursor state for desktop dock effect
  const [cursor, setCursor] = useState({ x: -9999, y: -9999 });

  // Resolve theme tokens
  const t = isDark ? T.dark : T.light;

  // ── Close mobile menu when clicking outside ───────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Desktop dock cursor handlers ──────────────────────────────────────────
  const handleNavMouseMove = useCallback(
    (e) => setCursor({ x: e.clientX, y: e.clientY }),
    [],
  );
  const handleNavMouseLeave = useCallback(
    () => setCursor({ x: -9999, y: -9999 }),
    [],
  );

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          MOBILE + TABLET  — top bar visible on all screens < lg
          ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {show && (
          <motion.div
            ref={navRef}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="hidden max-lg:flex fixed top-0 left-0 right-0 z-100 px-4 pt-4 flex-col"
          >
            {/* ── Glassmorphism top bar ─────────────────────────────────── */}
            <motion.div
              className="w-full flex items-center justify-between px-5 py-3 rounded-2xl relative overflow-hidden"
              animate={{ background: t.navBg }}
              transition={{ duration: 0.4 }}
              style={{
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: `1px solid ${t.navBorder}`,
                boxShadow: t.navShadow,
              }}
            >
              {/* Decorative orbs */}
              <FloatingOrb
                delay={0}
                style={{
                  width: 96,
                  height: 96,
                  left: -24,
                  top: -24,
                  background: t.orb1,
                  filter: "blur(20px)",
                }}
              />
              <FloatingOrb
                delay={2}
                style={{
                  width: 80,
                  height: 80,
                  right: -16,
                  bottom: -16,
                  background: t.orb2,
                  filter: "blur(20px)",
                }}
              />

              {/* Logo */}
              <a
                href="#hero"
                className="font-bold text-xl z-100 tracking-tight"
                style={{ color: t.textPrimary }}
              >
                Lokesh <span style={{ color: t.logoAccent }}>|</span> Patil
              </a>

              <div className="flex items-center gap-2 z-100">
                {/* Active-section badge — tablet only (sm+) */}
                <motion.span
                  key={activeItem}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: t.badgeBg,
                    border: `1px solid ${t.badgeBorder}`,
                    color: t.badgeText,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ background: t.textActive }}
                  />
                  {navItems.find((n) => n.id === activeItem)?.label}
                </motion.span>

                {/* Theme toggle */}
                <ThemeToggle
                  isDark={isDark}
                  onToggle={() => setIsDark((v) => !v)}
                  t={t}
                />

                {/* Hamburger */}
                <motion.button
                  onClick={() => setIsMenuOpen((v) => !v)}
                  whileTap={{ scale: 0.88 }}
                  aria-label="Toggle menu"
                  className="relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl"
                  style={{
                    background: isMenuOpen
                      ? t.hamburgerActiveBg
                      : t.hamburgerBg,
                    border: `1px solid ${isMenuOpen ? t.hamburgerActiveBorder : t.hamburgerBorder}`,
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="block h-[2px] rounded-full"
                      style={{
                        background: t.hamburgerLine,
                        originX: "center",
                        width: i === 1 ? "12px" : "18px",
                      }}
                      animate={
                        isMenuOpen
                          ? i === 0
                            ? { rotate: 45, y: 7, width: "18px" }
                            : i === 1
                              ? { opacity: 0, scaleX: 0 }
                              : { rotate: -45, y: -7, width: "18px" }
                          : {
                              rotate: 0,
                              y: 0,
                              opacity: 1,
                              width: i === 1 ? "12px" : "18px",
                            }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                      }}
                    />
                  ))}
                </motion.button>
              </div>
            </motion.div>

            {/* ── Tablet dropdown (sm – lg only) ───────────────────────── */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0, y: -10 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 250, damping: 28 }}
                  className="hidden sm:block w-full mt-2 overflow-hidden rounded-2xl relative"
                  style={{
                    background: t.menuBg,
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: `1px solid ${t.menuBorder}`,
                    boxShadow: t.menuShadow,
                  }}
                >
                  {/* Animated shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    animate={{
                      background: [
                        `radial-gradient(ellipse at 20% 20%, ${t.menuShimmerA} 0%, transparent 60%)`,
                        `radial-gradient(ellipse at 80% 80%, ${t.menuShimmerB} 0%, transparent 60%)`,
                        `radial-gradient(ellipse at 20% 20%, ${t.menuShimmerA} 0%, transparent 60%)`,
                      ],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative flex flex-col gap-2 p-4">
                    {navItems.map((item, idx) => (
                      <TabletMenuItem
                        key={item.id}
                        item={item}
                        isActive={activeItem === item.id}
                        index={idx}
                        t={t}
                        onClick={() => {
                          setActiveItem(item.id);
                          setIsMenuOpen(false);
                        }}
                      />
                    ))}

                    {/* Contact button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-2 w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide"
                      style={{
                        background: isDark
                          ? "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)"
                          : "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
                        color: isDark ? "#0c4a6e" : "#ffffff",
                        boxShadow: isDark
                          ? "0 4px 20px rgba(56,189,248,0.25)"
                          : "0 4px 20px rgba(2,132,199,0.30)",
                      }}
                    >
                      Contact me
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE ONLY  — bottom icon dock (< sm, menu open)
          ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {show && isMenuOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="sm:hidden fixed bottom-0 left-0 right-0 z-100 px-4 pb-4"
          >
            <motion.div
              className="w-full flex items-center justify-around px-4 py-3 rounded-3xl relative overflow-hidden"
              animate={{ background: t.dockBg }}
              transition={{ duration: 0.4 }}
              style={{
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: `1px solid ${t.dockBorder}`,
                boxShadow: t.dockShadow,
              }}
            >
              {navItems.map((item) => (
                <MobileDockItem
                  key={item.id}
                  item={item}
                  isActive={activeItem === item.id}
                  t={t}
                  onClick={() => {
                    setActiveItem(item.id);
                    setIsMenuOpen(false);
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP  — full pill navbar with macOS dock nav items  (lg+)
          ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex fixed top-0 left-0 w-full justify-center pt-6 pointer-events-none z-100"
          >
            <div className="pointer-events-auto relative z-100 w-full flex justify-center">
              <FloatingOrb
                delay={0}
                style={{
                  width: 192,
                  height: 192,
                  top: -48,
                  left: -48,
                  background: t.orb1,
                  filter: "blur(40px)",
                }}
              />
              <FloatingOrb
                delay={1.5}
                style={{
                  width: 144,
                  height: 144,
                  bottom: -40,
                  right: -40,
                  background: t.orb2,
                  filter: "blur(40px)",
                }}
              />

              <motion.nav
                ref={desktopNavRef}
                className="relative w-[95vw] backdrop-blur-2xl rounded-full px-6 py-3.5 flex items-center justify-between overflow-visible"
                animate={{ background: t.desktopNavBg }}
                transition={{ duration: 0.4 }}
                style={{
                  border: `1px solid ${t.desktopNavBorder}`,
                  boxShadow: t.desktopNavShadow,
                }}
              >
                <LiquidCursor containerRef={desktopNavRef} t={t} />

                {/* Logo */}
                <div className="flex-1 flex justify-start items-center z-100">
                  <a
                    href="#hero"
                    className="font-bold text-lg whitespace-nowrap hover:scale-110 transition-all duration-300 ease-out"
                    style={{ color: t.textPrimary }}
                  >
                    Lokesh <span style={{ color: t.logoAccent }}>|</span> Patil
                  </a>
                </div>

                {/* macOS dock nav items */}
                <div
                  className="flex flex-1 items-center justify-center gap-2 z-100 overflow-visible"
                  onMouseMove={handleNavMouseMove}
                  onMouseLeave={handleNavMouseLeave}
                >
                  {navItems.map((item, index) => (
                    <DockItem
                      key={item.id}
                      item={item}
                      index={index}
                      isActive={activeItem === item.id}
                      t={t}
                      onClick={() => setActiveItem(item.id)}
                      cursor={cursor}
                      tooltipBelow={true}
                    />
                  ))}
                </div>

                {/* Theme toggle + Contact */}
                <div className="flex-1 flex justify-end items-center gap-3 z-100">
                  <ThemeToggle
                    isDark={isDark}
                    onToggle={() => setIsDark((v) => !v)}
                    t={t}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center rounded-xl px-3.5 py-2 font-medium whitespace-nowrap transition-colors duration-300"
                    style={{ background: t.contactBg, color: t.contactText }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = t.contactHoverBg;
                      e.currentTarget.style.color = t.contactHoverText;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = t.contactBg;
                      e.currentTarget.style.color = t.contactText;
                    }}
                  >
                    Contact me
                  </motion.button>
                </div>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
