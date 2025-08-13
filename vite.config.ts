import tailwindPlugin from "@tailwindcss/vite";
import reactPlugin from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsconfigPathsPlugin from "vite-tsconfig-paths";

// https://vite.dev/config/
const config = defineConfig({
  server: {
    host: "admin.baquex.com",
    port: 443,
  },
  //@ts-expect-error tetsetests
  plugins: [mkcert(), tailwindPlugin(), tsconfigPathsPlugin(), reactPlugin()],
});

export default config;
