import { useEffect, useRef, useState } from "react";

/**
 * Lightweight IntersectionObserver hook.
 * Perf: lets us delay mounting heavy content and/or pause rendering when offscreen
 * without changing the visual result when the element is on-screen.
 */
export function useInViewport({
  rootMargin = "0px",
  threshold = 0.01,
  freezeOnceVisible = false,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((e) => e.isIntersecting);
        setInView((prev) => (freezeOnceVisible && prev ? true : isIntersecting));
      },
      { rootMargin, threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [freezeOnceVisible, rootMargin, threshold]);

  return { ref, inView };
}

