import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [svgr()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/utils/test-setup",
  },
})
