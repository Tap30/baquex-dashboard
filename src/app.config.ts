import logo from "@/assets/logo.svg";
import { Languages, LOGIN_PATH, SIGNIN_CALLBACK_PATH } from "@/constants";
import { strings } from "@/static-content";
import type { AppConfig } from "@/types";
import { getEnv } from "@/utils";

const host = getEnv("VITE_APP_HOSTNAME", true);

const appConfig: AppConfig = {
  logo,
  host,
  name: "Baquex",
  language: Languages.FA,
  authStrategy: {
    redirectAbsoluteUri: `${host}${SIGNIN_CALLBACK_PATH}`,
    logoutRedirectAbsoluteUri: `${host}${LOGIN_PATH}`,
    authority: getEnv("VITE_OIDC_AUTHORITY", true),
    clientId: getEnv("VITE_OIDC_CLIENT_ID", true),
    clientSecret: getEnv("VITE_OIDC_CLIENT_SECRET"),
    scope: getEnv("VITE_OIDC_SCOPE"),
  },
};

strings.setLanguage(appConfig.language);

export default appConfig;
