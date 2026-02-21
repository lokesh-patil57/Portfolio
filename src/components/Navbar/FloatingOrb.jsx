import { motion } from "framer-motion";

const FloatingOrb = ({ delay = 0, style = {} }) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{
        x: [0, 12, -8, 0],
        y: [0, -10, 6, 0],
        scale: [1, 1.08, 0.96, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default FloatingOrb;
