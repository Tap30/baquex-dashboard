import tailwindPlugin from "@tailwindcss/vite";
import reactPlugin from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv, type UserConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsconfigPathsPlugin from "vite-tsconfig-paths";

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname) as unknown as ImportMetaEnv;

  const baseConfig = {
    plugins: [tailwindPlugin(), tsconfigPathsPlugin(), reactPlugin()],
  } as const satisfies UserConfig;

  const devConfig: UserConfig = {
    ...baseConfig,
    // @ts-expect-error Mkcert package exports are ridiculous
    plugins: [...baseConfig.plugins, mkcert({ savePath: ".certs" })],
    server: {
      port: 443,
      open: `https://${env.VITE_APP_HOSTNAME}`,
    },
  };

  return mode === "development" ? devConfig : baseConfig;
});

export default config;
