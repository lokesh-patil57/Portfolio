import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Projects from "./pages/Projects";
import AnimatedCounter from "./components/counter/AnimaredCounter";
import { T } from "./constants/theme";

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Get current theme tokens
  const t = isDark ? T.dark : T.light;

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
    </div>
  );
}

export default App;
