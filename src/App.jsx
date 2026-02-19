import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Projects from "./pages/Projects";
import AnimatedCounter from "./components/counter/AnimaredCounter";

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-cyan-900">
      <Navbar show={introFinished} />
      <Hero onComplete={() => setIntroFinished(true)} />
        <AnimatedCounter />
      <Projects />
    </div>
  );
}

export default App;
