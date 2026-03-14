import React, { Suspense, useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import { T } from "./constants/theme";
import LazyMount from "./components/perf/LazyMount";
import About from "./About/About";
import ResumeFallback from "./components/Loading/ResumeFallback";
import SectionFallback from "./components/Loading/SectionFallback";
import { NavigationProvider } from "./context/NavigationContext";
import { Analytics } from "@vercel/analytics/react"

const AnimatedCounter = React.lazy(() => import("./components/Counter/AnimatedCounter"));
const Projects = React.lazy(() => import("./Project/Projects"));
const LogoSection = React.lazy(() => import("./components/LogoSection"));
const FeatureCards = React.lazy(() => import("./FeatureCards/FeatureCards"));
const ExperienceSection = React.lazy(() =>
  import("./ExperienceSection/ExperienceSection"),
);
const TechStack = React.lazy(() => import("./TechStack/TechStack"));
const Socials = React.lazy(() => import("./Socials/Socials"));
const Contact = React.lazy(() => import("./Contact/Contact"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));
const ResumeView = React.lazy(() => import("./pages/ResumeView"));



// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Scroll to hash section on hash change (and on initial load)
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.replace("#", ""));
    
    // Retry scroll with exponential backoff to handle LazyMount delays
    let attempts = 0;
    const maxAttempts = 3;
    
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        // Get navbar height by checking fixed navbar element
        const navbar = document.querySelector('[class*="fixed"][class*="top-0"]');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const offset = 20; // Additional padding below navbar
        
        // Calculate scroll position: element top - navbar height - padding
        const elementTop = el.getBoundingClientRect().top + window.scrollY;
        const targetScroll = elementTop - navbarHeight - offset;
        
        // Smooth scroll to calculated position
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
        return;
      }
      
      attempts++;
      if (attempts < maxAttempts) {
        // Double the delay each retry: 100ms, 200ms, 400ms
        const delay = 100 * Math.pow(2, attempts - 1);
        setTimeout(tryScroll, delay);
      }
    };

    // Start first attempt with 50ms delay to ensure DOM is ready
    const t = window.setTimeout(tryScroll, 50);

    return () => window.clearTimeout(t);
  }, [hash, pathname]);

  return null;
};

const MainPortfolio = ({ isDark, t, setIntroFinished }) => {
  return (
    <>
      <Hero onComplete={() => setIntroFinished(true)} isDark={isDark} />
      <About isDark={isDark} t={t} />

      {/* Delay below-the-fold sections to reduce initial JS + DOM work */}
      <LazyMount minHeight="40vh" sectionId="counter">
        <Suspense fallback={<SectionFallback />}>
          <AnimatedCounter isDark={isDark} />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="100vh" sectionId="projects-section">
        <Suspense fallback={<SectionFallback />}>
          <Projects isDark={isDark} />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="30vh" sectionId="logos">
        <Suspense fallback={<SectionFallback />}>
          <LogoSection isDark={isDark} />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="50vh" sectionId="features">
        <Suspense fallback={<SectionFallback />}>
          <FeatureCards isDark={isDark} t={t} />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="60vh" sectionId="experience">
        <Suspense fallback={<SectionFallback />}>
          <ExperienceSection isDark={isDark} t={t} />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="60vh" sectionId="skills">
        <Suspense fallback={<SectionFallback />}>
          <TechStack isDark={isDark} t={t} />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="60vh" sectionId="socials">
        <Suspense fallback={<SectionFallback />}>
          <Socials isDark={isDark} t={t} />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="70vh" sectionId="contact">
        <Suspense fallback={<SectionFallback />}>
          <Contact isDark={isDark} t={t} />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="20vh" sectionId="footer">
        <Suspense fallback={<SectionFallback />}>
          <Footer isDark={isDark} t={t} />
        </Suspense>
      </LazyMount>
    </>
  );
};

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Get current theme tokens
  const t = useMemo(() => (isDark ? T.dark : T.light), [isDark]);

  // Update body background color when theme changes
  useEffect(() => {
    document.body.style.backgroundColor = t.background;
    document.body.style.color = t.heroText;
    document.body.style.transition = "background-color 0.5s, color 0.5s";
  }, [isDark, t]);

  // Preload ResumeView component chunk on initial render
  useEffect(() => {
    // Perf: defer non-critical route prefetch so it doesn't compete with FCP/LCP.
    let idleId;
    let timeoutId;

    if (window.requestIdleCallback) {
      idleId = window.requestIdleCallback(() => import("./pages/ResumeView"));
    } else {
      timeoutId = window.setTimeout(() => import("./pages/ResumeView"), 3000);
    }

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Router>
      <NavigationProvider>
        <ScrollToTop />
        <ScrollToHash />
        <div
          className="min-h-screen selection:bg-cyan-500 selection:text-cyan-900 transition-colors duration-500"
          style={{ backgroundColor: t.background, color: t.heroText }}
        >
          <Navbar show={introFinished} isDark={isDark} setIsDark={setIsDark} />
          <Routes>
            <Route
              path="/"
              element={
                <MainPortfolio
                  isDark={isDark}
                  t={t}
                  setIntroFinished={setIntroFinished}
                />
              }
            />
            <Route
              path="/resume"
              element={
                <Suspense fallback={<ResumeFallback isDark={isDark} />}>
                  <ResumeView isDark={isDark} />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </NavigationProvider>
        <Analytics />
    </Router>
    
  );
}

export default App;
