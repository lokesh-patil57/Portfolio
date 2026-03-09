import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

/**
 * Keeps animations running with Canvas frameloop="demand".
 * Perf: only invalidates while `active` is true (e.g. while in viewport).
 */
export function DemandFrameloop({ active = true }) {
  const invalidate = useThree((s) => s.invalidate);
  const rafRef = useRef(0);

  useEffect(() => {
    const stop = () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    if (!active) {
      stop();
      return stop;
    }

    const tick = () => {
      invalidate();
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return stop;
  }, [active, invalidate]);

  return null;
}

