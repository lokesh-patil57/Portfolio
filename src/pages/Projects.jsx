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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      id="projects-section"
      ref={projectRef}
      className={`relative w-full h-screen overflow-hidden transition-colors duration-500 ${
        isMobile ? "is-mobile" : isTablet ? "is-tablet" : "is-desktop"
      }`}
      style={{
        backgroundColor: isDark ? "#000000" : "#ffffff",
        color: isDark ? "#ffffff" : "#111111",
      }}
    >
      {/* Content container */}
      <div className="relative z-10 w-full h-full">
        {/* 3-D rotating image carousel */}
        <div
          className="carousel-container absolute z-3"
          style={{
            transformStyle: "preserve-3d",
            animation: "autoRun 20s linear infinite",
          }}
        >
          {projectImages.map((img, index) => (
            <div
              key={index}
              className="carousel-item absolute inset-0"
              style={{
                "--i": index,
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
            className={`project-heading absolute ${fadeSlide("0ms").className}`}
            style={fadeSlide("0ms").style}
          >
            <h1
              className="leading-none font-black transition-colors duration-500"
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
            className={`model-bg absolute -translate-x-1/2 -translate-y-1/2 z-1 ${
              fadeSlide("400ms").className
            }`}
            style={{
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
            className={`works-heading absolute -translate-x-1/2 z-2 ${
              fadeSlide("800ms").className
            }`}
            style={{
              WebkitTextStroke: isDark ? "2px white" : "2px #1a1a1a",
              color: "transparent",
              letterSpacing: "2px",
              fontWeight: "900",
              ...fadeSlide("800ms").style,
            }}
          >
            Works
          </h1>

          {/* Author block */}
          <div
            ref={authorRef}
            className={`author-block absolute z-40 ${
              fadeSlide("1200ms").className
            }`}
            style={fadeSlide("1200ms").style}
          >
            <h2
              className="whitespace-nowrap leading-none font-bold transition-colors duration-500"
              style={{ color: isDark ? "#ffffff" : "#111111" }}
            >
              Lokesh Patil
            </h2>
            <p
              className="font-semibold transition-colors duration-500"
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
