import tailwindPlugin from "@tailwindcss/vite";
import reactPlugin from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv, type UserConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsconfigPathsPlugin from "vite-tsconfig-paths";
import type { AppEnv } from "./src/utils/env.ts";

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname) as unknown as AppEnv;

  const domain = env["VITE_APP_HOSTNAME"] || "https://e8t.tapsi.tech";
  const host = new URL(domain);

  const baseConfig = {
    plugins: [tailwindPlugin(), tsconfigPathsPlugin(), reactPlugin()],
  } as const satisfies UserConfig;

  const devConfig: UserConfig = {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      mkcert({ savePath: ".certs", hosts: [host.hostname] }),
    ],
    server: {
      port: 443,
      open: host.origin,
    },
  };

  const prodConfig: UserConfig = {
    ...baseConfig,
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const modulePath = id.split("node_modules/")[1];
              const topLevelFolder = modulePath?.split("/")[0];

              if (topLevelFolder !== ".pnpm") return topLevelFolder;

              const scopedPackageName = modulePath?.split("/")[1];
              const chunkName =
                scopedPackageName?.split("@")[
                  scopedPackageName.startsWith("@") ? 1 : 0
                ];

              return chunkName;
            }

            return undefined;
          },
        },
      },
    },
  };

  return mode === "development" ? devConfig : prodConfig;
});

export default config;
