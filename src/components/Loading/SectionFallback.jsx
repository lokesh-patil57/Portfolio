export default function SectionFallback() {
  // Perf: keep Suspense fallbacks extremely lightweight to avoid main-thread work.
  return <div className="loading-screen" aria-hidden="true" />;
}

