import React, { useEffect, useRef, useState } from "react";
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
import DarkBackground from "../assets/DarkBackground.jpeg";
import ModelBg from "../assets/2.png";

const Projects = () => {
  const images = [
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

  const projectRef = useRef(null);
  const projectTextRef = useRef(null);
  const modelBgRef = useRef(null);
  const worksTextRef = useRef(null);
  const authorRef = useRef(null);

  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateIn(true);
          } else {
            setAnimateIn(false);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    return () => {
      if (projectRef.current) {
        observer.unobserve(projectRef.current);
      }
    };
  }, []);

  return (
    <div
      id="counter"
      ref={projectRef}
      className="relative w-full h-screen overflow-hidden text-white"
      style={{
        backgroundColor: "#000000",
      }}
    >
      {/* Blurred Background */}
      {/* <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${DarkBackground}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2.5px)",
        }}
      ></div> */}

      {/* Content Container */}
      <div className="relative z-10 w-full h-full">
      {/* Slider */}
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
        {images.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              transform: `rotateY(${
                index * (360 / images.length)
              }deg) translateZ(500px)`,
            }}
          >
            <img
              src={img}
              alt={`project-${index}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-between">

        {/* Project Text */}
        <div 
          ref={projectTextRef}
          className={`absolute top-1/2 left-10 transition-all duration-700 ${
            animateIn 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-20"
          }`}
          style={{
            transitionDelay: animateIn ? "0ms" : "0ms",
          }}
        >
          <h1
            className="text-[12em] leading-none text-gray-300 font-black"
            style={{ fontFamily: "Ica Rubrik Black" }}
          >
            Project
          </h1>
        </div>

        {/* Model Background */}
        <div
          ref={modelBgRef}
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 transition-all duration-700 ${
            animateIn 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-20"
          }`}
          style={{
            width: "100%",
            height: "80vh",
            backgroundImage: `url('${ModelBg}')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transitionDelay: animateIn ? "400ms" : "0ms",
          }}
        ></div>

        {/* Works Stroke Text */}
        <h1
          ref={worksTextRef}
          className={`absolute top-[70%] left-3/10 -translate-x-1/2 text-[12em] z-2 transition-all duration-700 ${
            animateIn 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-20"
          }`}
          style={{
            WebkitTextStroke: "2px white",
            color: "transparent",
            letterSpacing: "2px",
            fontWeight: "900",
            bottom: "10px",
            transitionDelay: animateIn ? "800ms" : "0ms",
          }}
        >
          Works
        </h1>

        {/* Author */}
        <div 
          ref={authorRef}
          className={`absolute bottom-10 right-10 text-right z-40 transition-all duration-700 ${
            animateIn 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-20"
          }`}
          style={{
            transitionDelay: animateIn ? "1200ms" : "0ms",
          }}
        >
          <h2 className="text-[3.5em] whitespace-nowrap leading-none font-bold">
            Lokesh Patil
          </h2>
          <p className="text-[1.8em] font-semibold">MERN Developer</p>
        </div>
      </div>
      </div>

      {/* Animation */}
      <style>
        {`
        @keyframes autoRun {
          from {
            transform: translate(-50%, -50%) perspective(1200px) rotateX(-10deg) rotateY(0deg);
          }
          to {
            transform: translate(-50%, -50%) perspective(1200px) rotateX(-10deg) rotateY(360deg);
          }
        }
        `}
      </style>
    </div>
  );
};

export default Projects;