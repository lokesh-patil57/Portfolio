import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expCards } from "../components/constants/index";
import TitleHeader from "../components/TitleHeader/TitleHeader";
import GlowCard from "../components/GlowCard/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const cardVariants = {
  hidden: { x: -80, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      delay: i * 0.1,
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: i * 0.1 + 0.15,
    },
  }),
};

const Experience = ({ isDark = true, t = {} }) => {
  // ── Restore GSAP only for the timeline mask-wipe ──────────────────────────
  useGSAP(() => {
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

    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: throttle((self) => {
          gsap.to(".timeline", { scaleY: 1 - self.progress });
        }, 100),
      },
    });
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0 transition-colors duration-500"
      style={{ backgroundColor: t.background || "#000000" }}
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Student Work Experience"
          sub="💼 My Career Overview"
          isDark={isDark}
          t={t}
        />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card, index) => (
              <div key={card.title} className="exp-card-wrapper">
                {/* Card — Framer Motion slide-in from left */}
                <motion.div
                  className="xl:w-2/6"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariants}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <GlowCard card={card} index={index} isDark={isDark} t={t}>
                    <div>
                      <img src={card.imgPath} alt={card.title} />
                    </div>
                  </GlowCard>
                </motion.div>

                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    {/* Timeline wrapper — keep original DOM structure for GSAP to target */}
                    <div className="timeline-wrapper">
                      <div className="timeline" style={{ backgroundColor: isDark ? "#000000" : "#ffffff" }} />
                      <div 
                        className="gradient-line w-1 h-full" 
                        style={{
                          background: isDark 
                            ? "linear-gradient(0deg, rgba(69, 222, 196, 0) 0%, #62e0ff 25%, #52aeff 37.51%, #fd5c79 62.83%, #6d45ce 92.91%)"
                            : "linear-gradient(0deg, rgba(2, 132, 199, 0) 0%, rgba(2, 132, 199, 0.8) 25%, rgba(2, 132, 199, 0.6) 37.51%, rgba(124, 58, 237, 0.6) 62.83%, rgba(124, 58, 237, 0.8) 92.91%)"
                        }} 
                      />
                    </div>

                    {/* Experience text — Framer Motion fade-in */}
                    <motion.div
                      className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20"
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      variants={textVariants}
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <div className="timeline-logo" style={{ 
                        backgroundColor: isDark ? "#0e0e10" : "#f0f4f8", 
                        borderColor: isDark ? "#1c1c21" : "#e2e8f0"
                      }}>
                        <img src={card.logoPath} alt="logo" />
                      </div>
                      <div>
                        <h1 className="font-semibold text-3xl transition-colors duration-500" style={{ color: t.textPrimary }}>{card.title}</h1>
                        <p className="my-5 transition-colors duration-500" style={{ color: isDark ? "#d9ecff" : t.heroSubtitle }}>
                          🗓️&nbsp;{card.date}
                        </p>
                        <p className="italic transition-colors duration-500" style={{ color: t.badgeText }}>
                          Responsibilities
                        </p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 transition-colors duration-500" style={{ color: isDark ? "#d9ecff" : t.heroSubtitle }}>
                          {card.responsibilities.map(
                            (responsibility, rIndex) => (
                              <motion.li
                                key={rIndex}
                                className="text-lg"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: rIndex * 0.07 + 0.3,
                                }}
                                viewport={{ once: true }}
                              >
                                {responsibility}
                              </motion.li>
                            )
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;