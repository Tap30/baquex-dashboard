import reactPlugin from "@vitejs/plugin-react";
import tsconfigPathsPlugin from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const config = defineConfig({
  plugins: [reactPlugin(), tsconfigPathsPlugin()],
  test: {
    environment: "jsdom",
    setupFiles: ["test.setup.ts"],
  },
});

export default config;
