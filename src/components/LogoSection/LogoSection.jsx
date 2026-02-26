import { motion } from "framer-motion";
import { logoIconsList } from "../constants";
import { T } from "../../constants/theme";

const LogoIcon = ({ icon, isDark, index }) => {
  return (
    <motion.div
      className="flex-none flex-center marquee-item"
      whileHover={{ scale: 1.15, transition: { type: "spring", stiffness: 400, damping: 15 } }}
    >
      <img
        src={icon.imgPath}
        alt={icon.name}
        style={{
          filter: isDark ? "none" : "brightness(0)",
        }}
      />
    </motion.div>
  );
};

const LogoShowcase = ({ isDark }) => {
  const t = isDark ? T.dark : T.light;

  return (
    <motion.div
      className="md:my-20 my-10 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        className="gradient-edge"
        style={{
          background: isDark
            ? "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%)"
            : "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />
      <div
        className="gradient-edge"
        style={{
          background: isDark
            ? "linear-gradient(-90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%)"
            : "linear-gradient(-90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      <div className="marquee h-52">
        <div className="marquee-box md:gap-12 gap-5">
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={index} icon={icon} isDark={isDark} index={index} />
          ))}

          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`dup-${index}`} icon={icon} isDark={isDark} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const LogoShowcaseWrapper = ({ isDark }) => <LogoShowcase isDark={isDark} />;

export default LogoShowcaseWrapper;
