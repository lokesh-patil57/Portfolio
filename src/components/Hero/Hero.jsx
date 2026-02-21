import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./HeroTypingAnimation.css";
import codeIcon from "../../assets/code.svg";
import ideasIcon from "../../assets/ideas.svg";
import conceptsIcon from "../../assets/concepts.svg";
import designsIcon from "../../assets/designs.svg";
import Medusae from "../Medusae/Medusae";
import { T } from "../../constants/theme";

const Hero = ({ onComplete, isDark }) => {
  const [isFinished, setIsFinished] = useState(false);
  const t = isDark ? T.dark : T.light;

  // Animation State
  const fullText = "Shaping Code into Real Projects\nthat Deliver Results";
  const colors = ["blue", "red", "yellow", "green"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorColor, setCursorColor] = useState("blue");
  const [typingComplete, setTypingComplete] = useState(false);

  // Slider State
  const sliderItems = [
    { text: "Ideas", icon: ideasIcon, color: "text-blue-400" },
    { text: "Concepts", icon: conceptsIcon, color: "text-blue-400" },
    { text: "Designs", icon: designsIcon, color: "text-blue-400" },
    { text: "Code", icon: codeIcon, color: "text-blue-400" },
  ];
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    const startTyping = () => {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < fullText.length) {
            // Update color
            if (prev > 0) {
              const colorIndex = (prev - 1) % colors.length;
              setCursorColor(colors[colorIndex]);
            }
            return prev + 1;
          } else {
            clearInterval(intervalId);
            setTypingComplete(true);
            setIsFinished(true); // Trigger button appearance
            return prev;
          }
        });
      }, 70); // Faster typing speed (~30ms)
    };

    // Initial delay
    timeoutId = setTimeout(startTyping, 500);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to run only once on mount

  // Trigger onComplete when typing finishes
  useEffect(() => {
    if (isFinished && onComplete) {
      onComplete();
    }
  }, [isFinished, onComplete]);

  // Slider Interval
  useEffect(() => {
    if (isFinished) {
      const interval = setInterval(() => {
        setSliderIndex((prev) => (prev + 1) % sliderItems.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isFinished]);

  return (
    <section
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden z-40 transition-colors duration-500"
      style={{ backgroundColor: t.background }}
    >
      <div className="hero-container relative z-20">
        {/* Typing Phase - Always visible until finished, then replaced by slider version */}
        {!isFinished ? (
          <div className="typing-container">
            <h1 className="typing-text relative" style={{ color: t.heroText }}>
              {fullText.split("").map((char, index) => {
                const isTyped = index < currentIndex;
                const isLastChar = index === fullText.length - 1;

                return (
                  <span key={index} className="relative">
                    <span style={{ opacity: isTyped ? 1 : 0 }}>{char}</span>

                    {/* Normal Cursor: Show at the start of the CURRENT character being typed */}
                    {index === currentIndex && !typingComplete && (
                      <span
                        className={`cursor cursor-${cursorColor} absolute left-0`}
                      ></span>
                    )}

                    {/* Trailing Cursor: Show at the END of the LAST character when finished */}
                    {isLastChar && currentIndex === fullText.length && (
                      <span
                        className={`cursor cursor-${cursorColor} absolute -right-2`}
                      ></span>
                    )}
                  </span>
                );
              })}
            </h1>
          </div>
        ) : (
          <div className="typing-container">
            <h1
              className="typing-text relative flex flex-col items-center"
              style={{ color: t.heroText }}
            >
              <div className="flex items-center flex-wrap justify-center gap-2 md:gap-4">
                <span>Shaping</span>

                <div className="relative inline-flex items-center h-[1.2em] overflow-hidden w-[180px] md:w-[320px] justify-center align-middle">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={sliderIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`flex items-center justify-center gap-3 ${sliderItems[sliderIndex].color} absolute w-full`}
                    >
                      <img
                        src={sliderItems[sliderIndex].icon}
                        alt=""
                        className={`h-10 object-contain ${isDark ? "invert brightness-0 filter" : ""}`}
                      />
                      <span>{sliderItems[sliderIndex].text}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <span>into Real Projects</span>
              </div>
              <span>that Deliver Results</span>
            </h1>
          </div>
        )}
      </div>

      {/* Buttons Container - Always render to reserve space */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className={`mt-12 flex flex-col items-center gap-6 z-30 ${
          !isFinished ? "pointer-events-none select-none" : ""
        }`}
      >
        <p
          className="md:text-xl relative z-10 pointer-events-none text-center transition-colors duration-500"
          style={{ color: t.heroSubtitle }}
        >
          Hi, I am Lokesh , A Developer based in India with a Passion for Code.
        </p>

        <Button
          text="See My Work"
          className="md:w-80 md:h-16 w-60 h-12"
          id="counter"
        />
      </motion.div>

      {/* Interactive Particle Background - Visible AFTER typing is complete */}
      {isFinished && (
        <div className="absolute inset-0 z-0">
          <Medusae
            config={{
              background: { color: t.background },
              particles: {
                colorBase: isDark ? "#4a4a4a" : "#9ca3af",
                colorOne: "#64b5f6",
                colorTwo: "#ff6d00",
                colorThree: "#ffd600",
              },
            }}
          />
        </div>
      )}

      {/* Normal Background Glow */}
      {isFinished && (
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${isDark ? "to-black" : "to-white"} pointer-events-none z-10 opacity-80 transition-colors duration-500`}
        />
      )}
    </section>
  );
};

export default Hero;
