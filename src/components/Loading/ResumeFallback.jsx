import React from "react";
import { motion } from "framer-motion";
import { T } from "../../constants/theme";

const ResumeFallback = ({ isDark }) => {
  const t = isDark ? T.dark : T.light;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-28 pb-12 px-4 flex flex-col items-center justify-center"
      style={{ backgroundColor: t.background, color: t.textPrimary }}
    >
      <div className="max-w-5xl w-full flex flex-col gap-6 items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4"
          style={{
            borderColor: t.textSecondary,
            borderTopColor: t.textPrimary,
          }}
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-lg"
          style={{ color: t.textSecondary }}
        >
          Loading resume...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ResumeFallback;
