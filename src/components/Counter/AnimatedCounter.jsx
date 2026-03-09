import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { counterItems } from "../constants";
import { T } from "../../constants/theme";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: i * 0.12,
    },
  }),
};

const AnimatedCounter = ({ isDark }) => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  const t = isDark ? T.dark : T.light;

  useEffect(() => {
    let ctx;
    let cancelled = false;

    // Perf: dynamically import GSAP/ScrollTrigger so they don't inflate initial JS.
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        countersRef.current.forEach((counter, index) => {
          const numberElement = counter.querySelector(".counter-number");
          const item = counterItems[index];

          gsap.set(numberElement, { innerText: "0" });

          gsap.to(numberElement, {
            innerText: item.value,
            duration: 2.5,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: "#stats-counter",
              start: "top center",
              toggleActions: "play none none none",
            },
            onComplete: () => {
              numberElement.textContent = `${item.value}${item.suffix}`;
            },
          });
        });
      }, counterRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert?.();
    };
  }, []);

  return (
    <motion.div
      id="stats-counter"
      ref={counterRef}
      className="padding-x-lg xl:mt-0 mt-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <motion.div
            key={index}
            ref={(el) => el && (countersRef.current[index] = el)}
            custom={index}
            variants={cardVariants}
            className={`autoShow rounded-lg p-10 flex flex-col justify-center transition-colors duration-500 ${isDark ? "bg-black-100" : ""}`}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            style={{
              backgroundColor: isDark ? undefined : t.counterBg,
              border: `1px solid ${t.counterBorder}`,
              boxShadow: t.counterShadow,
            }}
          >
            <div
              className="counter-number text-5xl font-bold mb-2 transition-colors duration-500"
              style={{ color: t.counterTextPrimary }}
            >
              0 {item.suffix}
            </div>
            <div
              className="text-lg transition-colors duration-500"
              style={{ color: t.counterTextSecondary }}
            >
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default React.memo(AnimatedCounter);
