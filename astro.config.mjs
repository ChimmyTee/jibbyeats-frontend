import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false
  })],
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    }
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});