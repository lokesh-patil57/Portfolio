import React from 'react'
import { socialImgs } from '../constants'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const SCALE_SPRING = { stiffness: 380, damping: 22, mass: 0.6 }
const LIFT_SPRING = { stiffness: 350, damping: 26, mass: 0.5 }

const FooterIcon = ({ img, isDark }) => {
  const scale = useMotionValue(1)
  const lift = useMotionValue(0)
  
  const scaleSpring = useSpring(scale, SCALE_SPRING)
  const liftSpring = useSpring(lift, LIFT_SPRING)
  
  const glowOpacity = useTransform(scaleSpring, [1, 1.15], [0, 1])

  const handleMouseEnter = () => {
    scale.set(1.15)
    lift.set(-4)
  }

  const handleMouseLeave = () => {
    scale.set(1)
    lift.set(0)
  }

  return (
    <motion.a 
      className='icon' 
      target ='_blank' 
      href={img.url} 
      key={img.url}
      style={{ 
        scale: scaleSpring,
        y: liftSpring,
        transformStyle: "preserve-3d",
        backgroundColor: isDark ? "#000000" : "#ffffff", 
        borderColor: isDark ? "#1c1c21" : "rgba(0,0,0,0.1)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.9 }}
    >
      {/* Glow halo */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          opacity: glowOpacity,
          borderRadius: "12px",
          boxShadow: isDark 
            ? "0 0 20px 5px rgba(56,189,248,0.4), 0 0 40px 10px rgba(56,189,248,0.2)"
            : "0 0 20px 5px rgba(2,132,199,0.4), 0 0 40px 10px rgba(2,132,199,0.2)",
          zIndex: -1,
        }}
      />
      <img 
        src={img.imgPath} 
        alt="social images" 
        style={{ 
          filter: isDark ? "brightness(0) invert(1)" : "brightness(0)"
        }} 
      />
    </motion.a>
  )
}

const Footer = ({ isDark = true, t = {} }) => {
  return (
    <footer className='footer transition-colors duration-500' style={{ backgroundColor: t.background || "#000000", color: t.textPrimary || (isDark ? "#ffffff" : "#0f172a") }}>
      <div className='footer-container'>
        <div className="flex flex-col justify-center md:items-start items-center">
            <a href="/" style={{ color: t.textPrimary || (isDark ? "#ffffff" : "#0f172a") }}>Visit my Blog</a>
        </div>
        <div className='socials'>
            {socialImgs.map((img)=>(
                <FooterIcon key={img.url} img={img} isDark={isDark} />
            ))}
        </div>
        <div className="flex flex-col justify-center">
            <p className="text-center md:text-end " style={{ color: t.textPrimary || (isDark ? "#ffffff" : "#0f172a") }}>
                © {new Date().getFullYear()} Lokesh | Patil. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
