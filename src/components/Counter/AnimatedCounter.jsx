import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { motion } from "framer-motion";

import { counterItems } from "../constants";
import { T } from "../../constants/theme";

gsap.registerPlugin(ScrollTrigger);

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

  useGSAP(() => {
    countersRef.current.forEach((counter, index) => {
      const numberElement = counter.querySelector(".counter-number");
      const item = counterItems[index];

      // Set initial value to 0
      gsap.set(numberElement, { innerText: "0" });

      // Create the counting animation
      gsap.to(numberElement, {
        innerText: item.value,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerText: 1 }, // Ensures whole numbers
        scrollTrigger: {
          trigger: "#stats-counter",
          start: "top center",
        },
        // Add the suffix after counting is complete
        onComplete: () => {
          numberElement.textContent = `${item.value}${item.suffix}`;
        },
      });
    });
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
            className="rounded-lg p-10 flex flex-col justify-center transition-colors duration-500"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            style={{
              backgroundColor: t.counterBg,
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

export default AnimatedCounter;
