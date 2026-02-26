import { useRef } from "react";
import { motion } from "framer-motion";

const GlowCard = ({ card, index, children }) => {
  const cardRefs = useRef([]);
  // Throttle mouse move for glow effect
  const throttle = (fn, limit) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        fn(...args);
      }
    };
  };
  const handleMouseMove = throttle((index, e) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    card.style.setProperty("--start", angle + 60);
  }, 50); // Throttle to 20fps
  return (
    <motion.div
      ref={(el) => (cardRefs.current[index] = el)}
      onMouseMove={(e) => handleMouseMove(index, e)}
      className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="glow"></div>
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} src="/images/star.png" alt="star" className="size-5" />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-white-50 text-lg">{card.review}</p>
      </div>
      {children}
    </motion.div>
  );
};

import React from "react";
export default React.memo(GlowCard);