import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "../../context/NavigationContext";

/**
 * Mount children only when near/in the viewport.
 * This delays heavy JS work + component initialization until the user scrolls.
 * Also mounts immediately when navigating to a specific section via hash.
 */
export default function LazyMount({
  children,
  rootMargin = "600px 0px",
  minHeight,
  className,
  style,
  sectionId,
}) {
  const hostRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const { targetId } = useNavigation();

  useEffect(() => {
    if (isMounted) return;
    const el = hostRef.current;
    if (!el) return;

    // Force mount if this section is being navigated to
    if (sectionId && targetId === sectionId) {
      setIsMounted(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsMounted(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsMounted(true);
          obs.disconnect();
        }
      },
      { rootMargin },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [isMounted, rootMargin, sectionId, targetId]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{
        minHeight,
        ...style,
      }}
    >
      {isMounted ? children : null}
    </div>
  );
}

