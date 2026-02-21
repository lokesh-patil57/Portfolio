import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// LiquidCursor — a glowing orb that follows the mouse within the desktop navbar
// Props: containerRef (ref to the nav element), t (theme tokens)
const LiquidCursor = ({ containerRef, t }) => {
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 180, damping: 22 });
  const y = useSpring(rawY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      rawX.set(e.clientX - rect.left - 60);
      rawY.set(e.clientY - rect.top - 60);
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [containerRef, rawX, rawY]);

  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: 120,
        height: 120,
        x,
        y,
        background: t.cursorGradient,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        zIndex: 0,
      }}
    />
  );
};

export default LiquidCursor;
