import { motion } from "framer-motion";
import { abilities } from "../components/constants/index.js";
import { CheckCircle2, Sparkles } from "lucide-react";

const formats = abilities;

export default function ExportFormats({ isDark = true, t = {} }) {
  return (
    <section className={`relative py-24 md:py-16 overflow-hidden transition-colors duration-500`} style={{ backgroundColor: t.background }}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl`} style={{ background: t.ambientA }} />
        <div className={`absolute bottom-1/4 left-0 w-96 h-96 rounded-full blur-3xl`} style={{ background: t.ambientB }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md border shadow-sm transition-colors duration-500`} style={{ backgroundColor: t.badgeBg, borderColor: t.badgeBorder }}>
            <span className={`text-sm font-semibold tracking-wide transition-colors duration-500`} style={{ color: t.badgeText }}>
              🚀 Core Strengths
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-14 transition-colors duration-500`} style={{ color: t.textPrimary }}
        >
          🔥 Why Choose Me
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {formats.map((format, i) => {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty(
                    "--x",
                    `${e.clientX - rect.left}px`
                  );
                  e.currentTarget.style.setProperty(
                    "--y",
                    `${e.clientY - rect.top}px`
                  );
                }}
                className={`group relative rounded-3xl p-10 transition-all duration-300`} 
                style={{ 
                  backgroundColor: isDark ? "#0e0e10" : t.counterBg,
                  borderColor: t.counterBorder,
                  borderWidth: "1px",
                  boxShadow: t.counterShadow
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.borderColor = isDark ? "rgba(59,130,246,0.6)" : "rgba(2,132,199,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.borderColor = t.counterBorder;
                }}
              >
                {/* Cursor-follow glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: isDark 
                      ? `radial-gradient(250px circle at var(--x) var(--y), rgba(255,255,255,0.18), transparent 70%)`
                      : `radial-gradient(250px circle at var(--x) var(--y), rgba(2,132,199,0.15), transparent 70%)`
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className={`mb-6 flex justify-center items-center w-16 h-16 rounded-xl transition-colors duration-500`} style={{ backgroundColor: isDark ? "rgba(30,58,138,0.4)" : "rgba(2,132,199,0.12)" }}>
                    <img
                      src={format.imgPath}
                      alt={format.title}
                      className="w-10 h-10 object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl md:text-2xl font-bold mb-4 transition-colors duration-500`} style={{ color: t.textPrimary }}>
                    {format.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-base leading-relaxed transition-colors duration-500`} style={{ color: t.textSecondary }}>
                    {format.desc}
                  </p>

                  {/* Empty Features List */}
                  <ul className="space-y-2 mt-4"></ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}