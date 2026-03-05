import { useEffect, useState } from "react";

/**
 * Simple mobile width detector.
 * Uses window.innerWidth < breakpoint (default 768).
 */
const getIsMobile = (breakpoint) =>
  typeof window !== "undefined" ? window.innerWidth < breakpoint : false;

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(getIsMobile(breakpoint));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile(breakpoint));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}

