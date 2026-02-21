import React, { useEffect, useRef, useState } from "react";
import "./Projects.css";

import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.jpeg";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";
import img10 from "../assets/img10.jpeg";
import ModelBg from "../assets/2.png";

// ─── Image carousel data ──────────────────────────────────────────────────────
const projectImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
];

// ─── Projects Section ─────────────────────────────────────────────────────────
const Projects = ({ isDark = true }) => {
  const projectRef = useRef(null);
  const projectTextRef = useRef(null);
  const modelBgRef = useRef(null);
  const worksTextRef = useRef(null);
  const authorRef = useRef(null);

  const [animateIn, setAnimateIn] = useState(false);

  // Trigger entrance animations on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setAnimateIn(entry.isIntersecting);
        });
      },
      { threshold: 0.3 },
    );

    if (projectRef.current) observer.observe(projectRef.current);
    return () => {
      if (projectRef.current) observer.unobserve(projectRef.current);
    };
  }, []);

  // ─── Shared animation class helper ──────────────────────────────────────────
  const fadeSlide = (delay) => ({
    className: `transition-all duration-700 ${
      animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
    }`,
    style: { transitionDelay: animateIn ? delay : "0ms" },
  });

  return (
    <div
      id="counter"
      ref={projectRef}
      className="relative w-full h-screen overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#000000" : "#ffffff",
        color: isDark ? "#ffffff" : "#111111",
      }}
    >
      {/* Content container */}
      <div className="relative z-10 w-full h-full">
        {/* 3-D rotating image carousel */}
        <div
          className="absolute top-1/2 left-11/20 -translate-x-1/2 -translate-y-1/2 z-3"
          style={{
            width: "180px",
            height: "220px",
            transformStyle: "preserve-3d",
            transform: "translate(-50%, -50%) perspective(1200px)",
            animation: "autoRun 20s linear infinite",
          }}
        >
          {projectImages.map((img, index) => (
            <div
              key={index}
              className="absolute inset-0"
              style={{
                transform: `rotateY(${index * (360 / projectImages.length)}deg) translateZ(500px)`,
              }}
            >
              <img
                src={img}
                alt={`project-${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 w-full h-full flex flex-col justify-between">
          {/* "Project" heading */}
          <div
            ref={projectTextRef}
            className={`absolute top-1/2 left-10 ${fadeSlide("0ms").className}`}
            style={fadeSlide("0ms").style}
          >
            <h1
              className="text-[12em] leading-none font-black transition-colors duration-500"
              style={{
                fontFamily: "Ica Rubrik Black",
                color: isDark ? "#e0e0e0" : "#94e7f6",
              }}
            >
              Project
            </h1>
          </div>

          {/* Model / hero background image */}
          <div
            ref={modelBgRef}
            className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 ${fadeSlide("400ms").className}`}
            style={{
              width: "100%",
              height: "80vh",
              backgroundImage: `url('${ModelBg}')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              ...fadeSlide("400ms").style,
            }}
          />

          {/* "Works" outline text */}
          <h1
            ref={worksTextRef}
            className={`absolute top-[70%] left-3/10 -translate-x-1/2 text-[12em] z-2 ${fadeSlide("800ms").className}`}
            style={{
              WebkitTextStroke: isDark ? "2px white" : "2px #1a1a1a",
              color: "transparent",
              letterSpacing: "2px",
              fontWeight: "900",
              bottom: "10px",
              ...fadeSlide("800ms").style,
            }}
          >
            Works
          </h1>

          {/* Author block */}
          <div
            ref={authorRef}
            className={`absolute bottom-10 right-10 text-right z-40 ${fadeSlide("1200ms").className}`}
            style={fadeSlide("1200ms").style}
          >
            <h2
              className="text-[3.5em] whitespace-nowrap leading-none font-bold transition-colors duration-500"
              style={{ color: isDark ? "#ffffff" : "#111111" }}
            >
              Lokesh Patil
            </h2>
            <p
              className="text-[1.8em] font-semibold transition-colors duration-500"
              style={{ color: isDark ? "#94a3b8" : "#4b5563" }}
            >
              MERN Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
