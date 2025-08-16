import logo from "@/assets/logo.svg";
import { Languages, LOGIN_PATH, SIGNIN_CALLBACK_PATH } from "@/constants";
import { getEnv } from "@/utils";
import type { AppConfig } from "./types.ts";

const appConfig: AppConfig = {
  logo,
  name: "Baquex",
  host: "admin.baquex.com",
  language: Languages.FA,
  authStrategy: {
    type: "oidc",
    authority: getEnv("VITE_OIDC_AUTHORITY", true),
    clientId: getEnv("VITE_OIDC_CLIENT_ID", true),
    redirectAbsoluteUri: `${getEnv("VITE_APP_HOSTNAME", true)}${SIGNIN_CALLBACK_PATH}`,
    logoutRedirectAbsoluteUri: `${getEnv("VITE_APP_HOSTNAME", true)}${LOGIN_PATH}`,
    scope: getEnv("VITE_OIDC_SCOPE") ?? undefined,
    clientSecret: getEnv("VITE_OIDC_CLIENT_SECRET") ?? undefined,
  },
};

export default appConfig;
