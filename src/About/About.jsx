import { motion } from "framer-motion";

const services = [
  {
    title: "Prototyping",
    desc: "I build fast, clickable prototypes to validate ideas and showcase product flows.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10M7 12h6M7 16h8" />
      </svg>
    ),
  },
  {
    title: "Frontend Development",
    desc: "Clean, responsive UI with modern React patterns and smooth micro-interactions.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 17l6-5-6-5" />
        <path d="M12 19h8" />
      </svg>
    ),
  },
  {
    title: "Design Consulting",
    desc: "Practical guidance on layout, hierarchy, and UX—so the site feels premium and clear.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      </svg>
    ),
  },
];

const About = ({ isDark = true, t = {} }) => {
  const accent = t.aboutAccent || (isDark ? "#E8FF5A" : "#0ea5e9");
  const surface = t.aboutSurface || (isDark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.04)");
  const surfaceBorder =
    t.aboutSurfaceBorder || (isDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.10)");
  const muted = t.aboutMuted || t.textSecondary;
  const accentSoftBg = isDark ? "rgba(56,189,248,0.12)" : "rgba(14,165,233,0.10)";
  const accentSoftBorder = isDark ? "rgba(56,189,248,0.22)" : "rgba(14,165,233,0.18)";
  const accentGlow = isDark ? "rgba(56,189,248,0.18)" : "rgba(14,165,233,0.16)";

  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 md:py-24 transition-colors duration-500"
      style={{ backgroundColor: t.background }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-16 -left-24 w-[420px] h-[420px] rounded-full blur-3xl"
          style={{ background: t.ambientA }}
        />
        <div
          className="absolute -bottom-20 -right-24 w-[420px] h-[420px] rounded-full blur-3xl"
          style={{ background: t.ambientB }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: headline + copy + CTAs + stats */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.95] tracking-tight"
              style={{ color: t.textPrimary }}
            >
              Lokesh Patil is
              <br />
              <span style={{ color: accent }}>Right Here!</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: muted }}
            >
              With a sharp eye for detail and a builder mindset, I turn ideas into polished,
              production-ready experiences that feel fast, modern, and easy to use.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.14, ease: "easeOut" }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a href="/#contact" className="no-underline">
                <button
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)"
                      : "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
                    color: isDark ? "#0c4a6e" : "#ffffff",
                    boxShadow: isDark
                      ? "0 10px 24px rgba(56,189,248,0.18)"
                      : "0 10px 24px rgba(2,132,199,0.20)",
                  }}
                >
                  Chat with me
                </button>
              </a>

              <a href="/#contact" className="no-underline">
                <button
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                  style={{
                    background: "transparent",
                    color: t.textPrimary,
                    border: `1px solid ${surfaceBorder}`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = surface)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Start a project
                </button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-10 grid grid-cols-2 gap-6 max-w-sm"
            >
              <div>
                <div className="text-3xl font-extrabold" style={{ color: accent }}>
                  98%
                </div>
                <div className="mt-1 text-sm" style={{ color: muted }}>
                  Satisfaction Rate
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold" style={{ color: accent }}>
                  10+
                </div>
                <div className="mt-1 text-sm" style={{ color: muted }}>
                  Projects Delivered
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle: image */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-[280px] sm:w-[320px] md:w-[360px]"
            >
              <div
                className="absolute -inset-3 rounded-[2rem] blur-2xl"
                style={{
                  background: isDark
                    ? `radial-gradient(closest-side, ${accentGlow}, transparent 70%)`
                    : `radial-gradient(closest-side, ${accentGlow}, transparent 70%)`,
                }}
              />
              <div
                className="relative rounded-[2rem] overflow-hidden"
                style={{
                  background: surface,
                  border: `1px solid ${surfaceBorder}`,
                  boxShadow: isDark
                    ? "0 24px 80px rgba(0,0,0,0.55)"
                    : "0 24px 80px rgba(15,23,42,0.12)",
                }}
              >
                <img
                  src="/images/loki2.avif"
                  alt="Lokesh portrait"
                  className="w-full h-[420px] sm:h-[460px] object-cover object-top"
                  loading="lazy"
                  decoding="async"
                  width={720}
                  height={920}
                />
              </div>
            </motion.div>
          </div>

          {/* Right: services list */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {services.map((s, idx) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: idx * 0.06, ease: "easeOut" }}
                  className="rounded-2xl p-5"
                  style={{
                    background: surface,
                    border: `1px solid ${surfaceBorder}`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: accentSoftBg,
                        color: accent,
                        border: `1px solid ${accentSoftBorder}`,
                      }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <div className="text-sm font-extrabold tracking-wide uppercase" style={{ color: accent }}>
                        {s.title}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: muted }}>
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
