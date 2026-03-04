import React from "react";
import { motion } from "framer-motion";
const TitleHeader = React.memo(({ title, sub, isDark = true, t = {} }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Section Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md border shadow-sm transition-colors duration-500`} style={{ backgroundColor: t.badgeBg, borderColor: t.badgeBorder }}>
          <span className={`text-sm font-semibold tracking-wide transition-colors duration-500`} style={{ color: t.badgeText }}>
            {sub}
          </span>
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center transition-colors duration-500`} style={{ color: t.textPrimary }}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
});

export default TitleHeader;