import React from "react";

import arrow from "../../assets/arrow-down.svg";

const Button = ({ text, className, id }) => {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();

        const target = document.getElementById("counter");

        if (target && id) {
          const top = target.getBoundingClientRect().top + window.scrollY;

          window.scrollTo({ top, behavior: "smooth" });
        }
      }}
      className={`${className ?? ""} cta-wrapper `}
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src={arrow} alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;
