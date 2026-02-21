import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DockItem from "./DockItem";
import navItems from "./navItems";

/**
 * DesktopDock
 * ──────────────
 * A glassmorphism dock bar centered at the bottom of the viewport.
 * Mouse position is tracked at the dock level and forwarded to each
 * DockItem so they can compute proximity-based scale independently.
 *
 * Props:
 *   show     — boolean (controlled by parent scroll logic)
 *   isDark   — boolean
 *   t        — theme tokens
 *   activeItem   — string id
 *   setActiveItem — (id: string) => void
 */
const DesktopDock = ({ show, t, activeItem, setActiveItem }) => {
  const dockRef = useRef(null);
  // Shared cursor position state propagated downward
  const [cursor, setCursor] = useState({ x: -9999, y: -9999 });

  const handleMouseMove = useCallback((e) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursor({ x: -9999, y: -9999 });
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="fixed bottom-6 left-0 right-0 z-50 flex items-end justify-center pointer-events-none hidden lg:flex"
        >
          {/* Dock bar */}
          <motion.div
            ref={dockRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="pointer-events-auto flex items-end gap-3 px-5 py-3.5 rounded-2xl relative"
            style={{
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              background: t.dockBg,
              border: `1px solid ${t.dockBorder}`,
              boxShadow: `${t.dockShadow}, 0 0 0 1px ${t.dockBorder}`,
            }}
          >
            {/* Subtle inner shimmer */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
              animate={{
                background: [
                  `radial-gradient(ellipse at 20% 50%, ${t.ambientA} 0%, transparent 60%)`,
                  `radial-gradient(ellipse at 80% 50%, ${t.ambientB} 0%, transparent 60%)`,
                  `radial-gradient(ellipse at 20% 50%, ${t.ambientA} 0%, transparent 60%)`,
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {navItems.map((item, index) => (
              <DockItem
                key={item.id}
                item={item}
                index={index}
                isActive={activeItem === item.id}
                t={t}
                onClick={() => setActiveItem(item.id)}
                cursor={cursor}
                dockRef={dockRef}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DesktopDock;
