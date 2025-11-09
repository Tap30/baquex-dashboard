import { SIGNIN_CALLBACK_PATH, SIGNOUT_CALLBACK_PATH } from "@constants/routes";

export const PORTAL_DESTINATION_ID = "global-portal-destination";

export const DEFAULT_GRPC_GATEWAY = "https://admin-api.baquex.com";
export const DEFAULT_APP_HOSTNAME = "https://admin.baquex.com";
export const DEFAULT_SIGNIN_REDIRECT_PATHNAME = SIGNIN_CALLBACK_PATH;
export const DEFAULT_SIGNOUT_REDIRECT_PATHNAME = SIGNOUT_CALLBACK_PATH;

export const DEFAULT_OIDC_AUTHORITY = "https://sso.example.com/realms/example";
export const DEFAULT_OIDC_SCOPE = "openid profile email";
export const DEFAULT_OIDC_CLIENT_ID = "experiment-platform";
