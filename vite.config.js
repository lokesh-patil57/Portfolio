import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Performance-focused build output (no UI/runtime behavior changes).
  build: {
    minify: "esbuild",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Keep heavy libraries out of the entry chunk for faster FCP/LCP.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // Group all WebGL/R3F related deps together to avoid circular chunks.
          if (
            id.includes("node_modules/three") ||
            id.includes("node_modules/@react-three") ||
            id.includes("node_modules/three-stdlib") ||
            id.includes("node_modules/troika-")
          ) {
            return "three";
          }
          if (id.includes("node_modules/gsap")) return "gsap";
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (id.includes("node_modules/react-router")) return "router";
          // Let Rollup decide the rest to avoid chunk dependency cycles.
        },
      },
    },
  },
  // Helps dev server startup; does not affect production visuals.
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
})
