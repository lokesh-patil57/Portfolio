import { logoIconsList } from "../constants";
import { T } from "../../constants/theme";

const LogoIcon = ({ icon, isDark }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img 
        src={icon.imgPath} 
        alt={icon.name}
        style={{
          filter: isDark ? 'none' : 'brightness(0)'
        }}
      />
    </div>
  );
};

const LogoShowcase = ({ isDark }) => {
  const t = isDark ? T.dark : T.light;
  
  return (
  <div className="md:my-20 my-10 relative">
    <div 
      className="gradient-edge" 
      style={{
        background: isDark 
          ? 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%)'
          : 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)'
      }}
    />
    <div 
      className="gradient-edge" 
      style={{
        background: isDark 
          ? 'linear-gradient(-90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%)'
          : 'linear-gradient(-90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)'
      }}
    />

    <div className="marquee h-52">
      <div className="marquee-box md:gap-12 gap-5">
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} isDark={isDark} />
        ))}

        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} isDark={isDark} />
        ))}
      </div>
    </div>
  </div>
  );
};

const LogoShowcaseWrapper = ({ isDark }) => <LogoShowcase isDark={isDark} />;

export default LogoShowcaseWrapper;
