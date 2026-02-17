import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ show = true }) => {
  const [activeItem, setActiveItem] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      id: "experiences",
      label: "Experiences",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current"
        >
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
      ),
    },
    {
      id: "skills",
      label: "Skills",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current"
        >
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
        </svg>
      ),
    },
    {
      id: "socials",
      label: "Socials",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
    },
    {
      id: "resume",
      label: "Resume",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current"
        >
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      ),
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full flex justify-center pt-6 pointer-events-none z-50"
        >
          {/* Navbar Container */}
          <div className="pointer-events-auto relative z-10 w-full flex justify-center">
            {/* Liquid Blob Effects */}
            <div className="absolute -top-[50px] -left-[50px] w-[200px] h-[200px] bg-blue-500/10 dark:bg-blue-500/10 blur-[40px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-blob-morph pointer-events-none" />
            <div className="absolute -bottom-[40px] -right-[40px] w-[150px] h-[150px] bg-purple-500/10 dark:bg-purple-500/10 blur-[40px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-blob-morph-delayed pointer-events-none" />

            {/* Glass Navbar */}
            <nav className="relative w-[95vw] backdrop-blur-2xl bg-white/5 border border-white/20 rounded-full px-6 py-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex items-center justify-between text-white">
              {/* Logo */}
              <div className="flex-1 flex justify-start items-center gap-4">
                <a
                  href="#hero"
                  className="logo font-bold text-lg whitespace-nowrap text-white hover:scale-110 transition-all duration-300 ease-out"
                >
                  Lokesh | Patil
                </a>
              </div>

              {/* Desktop Nav Items */}
              <div className="hidden lg:flex flex-none items-center gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`
                      relative w-24 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer
                      transition-all duration-300 ease-out group
                      ${
                        activeItem === item.id
                          ? "bg-sky-500/20 border border-sky-500/30 text-sky-300 scale-[1.15] shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                          : "bg-white/5 border border-white/10 hover:bg-white/15 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                      }
                    `}
                    aria-label={item.label}
                  >
                    {/* Ripple Effect */}
                    <span className="absolute inset-0 rounded-full bg-white/40 scale-0 group-active:animate-ripple pointer-events-none" />

                    {/* Icon */}
                    <span
                      className={`
                      transition-all duration-300
                      ${
                        activeItem === item.id
                          ? "text-sky-200"
                          : "text-white/90 group-hover:text-white group-hover:scale-110"
                      }
                    `}
                    >
                      {item.icon}
                    </span>

                    {/* Tooltip */}
                    <span className="absolute -bottom-[50px] left-1/2 -translate-x-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out bg-white text-black text-sm px-4 py-1.5 rounded-full font-medium whitespace-nowrap shadow-lg z-50 pointer-events-none">
                      {item.label}
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 transform"></span>
                    </span>
                  </button>
                ))}
              </div>

              {/* Desktop Contact Button */}
              <div className="hidden lg:flex flex-1 justify-end">
                <button className="inner flex text-center justify-center items-center rounded-xl px-3.5 py-2 bg-white text-black font-medium border-none transition-colors duration-300 whitespace-nowrap hover:bg-black hover:text-white">
                  Contact me
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex-1 flex justify-end">
                <button
                  onClick={toggleMenu}
                  className="p-2 text-white hover:text-sky-300 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </nav>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-[80px] left-0 w-full px-4 pointer-events-auto lg:hidden"
              >
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl">
                  <div className="flex flex-col gap-4 w-full">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveItem(item.id);
                          setIsMenuOpen(false);
                        }}
                        className={`
                          flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 w-full
                          ${
                            activeItem === item.id
                              ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                              : "hover:bg-white/10 text-white"
                          }
                        `}
                      >
                        <span className="w-6 h-6">{item.icon}</span>
                        <span className="font-medium text-lg">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Contact me
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
