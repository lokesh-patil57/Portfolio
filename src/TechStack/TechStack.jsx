import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { useInViewport } from "../components/perf/useInViewport";

import TitleHeader from "../components/TitleHeader/TitleHeader.jsx";
import { techStackIcons } from "../components/constants/index.js";
const TechIconCardExperience = React.lazy(
  () => import("../components/Models/Techlogos/TechIconCardExperience"),
);

const TechStack = ({ isDark = true, t = {} }) => {
  const scopeRef = useRef(null);

  // Animate the tech cards in the skills section
  useEffect(() => {
    let ctx;
    let cancelled = false;

    // Perf: dynamically import GSAP + ScrollTrigger so they don't hit initial JS.
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".tech-card",
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
            stagger: 0.2,
            scrollTrigger: {
              trigger: "#skills",
              start: "top center",
            },
          },
        );
      }, scopeRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert?.();
    };
  }, []);

  // Perf: gate each heavy 3D icon so models/WebGL init only when visible.
  const TechIconWrapper = useMemo(() => {
    const Comp = ({ model }) => {
      const { ref: hostRef, inView } = useInViewport({
        rootMargin: "200px 0px",
        threshold: 0.01,
        freezeOnceVisible: true,
      });
      const [mounted, setMounted] = React.useState(false);

      useEffect(() => {
        if (mounted) return;
        if (inView) setMounted(true);
      }, [inView, mounted]);

      return (
        <div ref={hostRef} className="tech-icon-wrapper">
          {mounted ? (
            <Suspense fallback={null}>
              {/* Perf: pause render loop when offscreen (keeps visuals identical when in view). */}
              <TechIconCardExperience model={model} isDark={isDark} active={inView} />
            </Suspense>
          ) : null}
        </div>
      );
    };

    return React.memo(Comp);
  }, [isDark]);

  return (
    <div
      ref={scopeRef}
      id="skills"
      className="flex-center section-padding transition-colors duration-500"
      style={{ backgroundColor: t.background || "#000000" }}
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
          isDark={isDark}
          t={t}
        />
        <div className="tech-grid">
          {/* Loop through the techStackIcons array and create a component for each item. 
              The key is set to the name of the tech stack icon, and the classnames are set to 
              card-border, tech-card, overflow-hidden, and group. The xl:rounded-full and rounded-lg 
              classes are only applied on larger screens. */}
          {techStackIcons.map((techStackIcon) => (
            <div
              key={techStackIcon.name}
              className={`card-border tech-card overflow-hidden group xl:rounded-full rounded-lg ${isDark ? "bg-black-100" : ""}`}
              style={{ 
                backgroundColor: isDark ? undefined : "rgba(255,255,255,0.5)",
                borderColor: isDark ? undefined : "rgba(2,132,199,0.3)"
              }}
            >
              {/* The tech-card-animated-bg div is used to create a background animation when the 
                  component is hovered. */}
              <div 
                className="tech-card-animated-bg" 
                style={{ background: isDark ? undefined : "rgba(2,132,199,0.1)" }}
              />
              <div className="tech-card-content">
                {/* The tech-icon-wrapper div contains the TechIconCardExperience component, 
                    which renders the 3D model of the tech stack icon. */}
                <TechIconWrapper model={techStackIcon} />
                {/* The padding-x and w-full classes are used to add horizontal padding to the 
                    text and make it take up the full width of the component. */}
                <div className="padding-x w-full">
                  {/* The p tag contains the name of the tech stack icon. */}
                  <p style={{ color: isDark ? undefined : "rgba(0,0,0,0.5)" }}>{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))}

          {/* This is for the img part */}
          {/* {techStackImgs.map((techStackIcon, index) => (
            <div
              key={index}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <img src={techStackIcon.imgPath} alt="" />
                </div>
                <div className="padding-x w-full">
                  <p>{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TechStack);