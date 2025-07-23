import tailwindPlugin from "@tailwindcss/vite";
import reactPlugin from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPathsPlugin from "vite-tsconfig-paths";

// https://vite.dev/config/
const config = defineConfig({
  plugins: [tailwindPlugin(), tsconfigPathsPlugin(), reactPlugin()],
});

export default config;
