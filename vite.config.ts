import tailwindPlugin from "@tailwindcss/vite";
import reactPlugin from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv, type UserConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsconfigPathsPlugin from "vite-tsconfig-paths";
import type { AppEnv } from "./src/utils/env.ts";

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname) as unknown as AppEnv;

  const domain = env["VITE_APP_HOSTNAME"] || "https://e8t.tapsi.tech";

  // Remove any leading protocol (e.g., http://, https://)
  const certHost = domain.replace(/^(https?:\/\/)/, "");

  const baseConfig = {
    plugins: [tailwindPlugin(), tsconfigPathsPlugin(), reactPlugin()],
  } as const satisfies UserConfig;

  const devConfig: UserConfig = {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      mkcert({ savePath: ".certs", hosts: [certHost] }),
    ],
    server: {
      port: 443,
      open: domain,
    },
  };

  return mode === "development" ? devConfig : baseConfig;
});

export default config;
