import { socials } from "../components/constants/index.js";
import TitleHeader from "../components/TitleHeader/TitleHeader";
import GlowCard from "../components/GlowCard/GlowCard";
import React from "react";

const Socials = ({ isDark = true, t = {} }) => {
  return (
    <section id="socials" className="flex-center section-padding transition-colors duration-500" style={{ backgroundColor: t.background || "#000000" }}>
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="What I Contributed in hackathon !"
          sub="⭐ My Hackathon Experiences"
          isDark={isDark}
          t={t}
        />

        <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
          {socials.map((testimonial, index) => (
            <GlowCard card={testimonial} key={index} index={index} isDark={isDark} t={t}>
              <div className="flex items-center gap-3">
                <div>
                  <img
                    src={testimonial.imgPath}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-white-50">{testimonial.mentions}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Socials);