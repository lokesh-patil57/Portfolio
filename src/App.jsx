import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Projects from "./Project/Projects";
import AnimatedCounter from "./components/Counter/AnimatedCounter";
import { T } from "./constants/theme";
import LogoSection from "./components/LogoSection";
import FeatureCards from "./FeatureCards/FeatureCards";
import ExperienceSection from "./ExperienceSection/ExperienceSection";
import TechStack from "./TechStack/TechStack";
import Socials from "./Socials/Socials";
import Contact from "./Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Get current theme tokens
  const t = isDark ? T.dark : T.light;

  // Update body background color when theme changes
  useEffect(() => {
    document.body.style.backgroundColor = t.background;
    document.body.style.color = t.heroText;
    document.body.style.transition = "background-color 0.5s, color 0.5s";
  }, [isDark, t]);

  return (
    <div
      className="min-h-screen selection:bg-cyan-500 selection:text-cyan-900 transition-colors duration-500"
      style={{ backgroundColor: t.background, color: t.heroText }}
    >
      <Navbar show={introFinished} isDark={isDark} setIsDark={setIsDark} />
      <Hero onComplete={() => setIntroFinished(true)} isDark={isDark} />
      {/* AnimatedCounter and Projects might need updates too, but starting with Hero as requested */}
      <AnimatedCounter isDark={isDark} />
      <Projects isDark={isDark} />
      <LogoSection isDark={isDark} />
      <FeatureCards isDark={isDark} t={t} />
      <ExperienceSection isDark={isDark} t={t} />
      <TechStack isDark={isDark} t={t} />
      <Socials isDark={isDark} t={t} />
      <Contact isDark={isDark} t={t} />
      <Footer isDark={isDark} t={t} />
    </div>
  );
}

export default App;
