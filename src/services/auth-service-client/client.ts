import {
  DEFAULT_APP_HOSTNAME,
  DEFAULT_OIDC_AUTHORITY,
  DEFAULT_OIDC_CLIENT_ID,
  DEFAULT_OIDC_SCOPE,
  DEFAULT_SIGNIN_REDIRECT_PATHNAME,
  DEFAULT_SIGNOUT_REDIRECT_PATHNAME,
} from "@constants/config";
import { AuthenticationClient, OidcStrategy } from "@services/auth";
import { getAppEnv } from "@utils/env";

const host = getAppEnv("VITE_APP_HOSTNAME", DEFAULT_APP_HOSTNAME);

const REDIRECT_URI = `${host}${DEFAULT_SIGNIN_REDIRECT_PATHNAME}`;
const LOGOUT_URI = `${host}${DEFAULT_SIGNOUT_REDIRECT_PATHNAME}`;

const AUTHORITY = getAppEnv("VITE_OIDC_AUTHORITY", DEFAULT_OIDC_AUTHORITY);
const SCOPE = getAppEnv("VITE_OIDC_SCOPE", DEFAULT_OIDC_SCOPE);
const CLIENT_ID = getAppEnv("VITE_OIDC_CLIENT_ID", DEFAULT_OIDC_CLIENT_ID);

export const authClient = new AuthenticationClient(
  new OidcStrategy({
    authority: AUTHORITY,
    scope: SCOPE,
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    post_logout_redirect_uri: LOGOUT_URI,
    response_type: "code",
    filterProtocolClaims: true,
  }),
);
