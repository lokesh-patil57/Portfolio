import React from "react";
import { motion } from "framer-motion";
import arrow from "../../assets/arrow-down.svg";

const Button = ({ text, className, id }) => {
  return (
    <motion.a
      onClick={(e) => {
        e.preventDefault();

        if (id) {
          const target = document.getElementById(id);
          if (target) {
            const top =
              target.getBoundingClientRect().bottom +
              window.scrollY -
              window.innerHeight;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      }}
      className={`${className ?? ""} cta-wrapper `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src={arrow} alt="arrow" />
        </div>
      </div>
    </motion.a>
  );
};

export default Button;
