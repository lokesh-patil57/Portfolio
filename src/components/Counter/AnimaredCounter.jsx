import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { counterItems } from "../constants";
import { T } from "../../constants/theme";

gsap.registerPlugin(ScrollTrigger);

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
          trigger: "#counter",
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
    <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => el && (countersRef.current[index] = el)}
            className="rounded-lg p-10 flex flex-col justify-center transition-colors duration-500"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
