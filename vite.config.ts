import tailwindPlugin from "@tailwindcss/vite";
import reactPlugin from "@vitejs/plugin-react-swc";
import { defineConfig, type UserConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsconfigPathsPlugin from "vite-tsconfig-paths";

const baseConfig = {
  plugins: [tailwindPlugin(), tsconfigPathsPlugin(), reactPlugin()],
} as const satisfies UserConfig;

const devConfig: UserConfig = {
  ...baseConfig,
  server: {
    host: "simorgh.tapsi.ir",
    port: 443,
  },
  // @ts-expect-error Mkcert package exports are ridiculous
  plugins: [...baseConfig.plugins, mkcert({ savePath: ".certs" })],
};

// https://vite.dev/config/
const config = defineConfig(({ mode }) =>
  mode === "development" ? devConfig : baseConfig,
);

export default config;
