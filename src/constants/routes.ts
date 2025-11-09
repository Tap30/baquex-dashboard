// BASE ROUTES
const BASE_AUTH_PATH = "/auth";

// AUTH ROUTES
export const LOGIN_PATH = `${BASE_AUTH_PATH}/login`;
export const ACCESS_DENIED_PATH = `${BASE_AUTH_PATH}/access-denied`;
export const SIGNIN_CALLBACK_PATH = `${BASE_AUTH_PATH}/signin/callback`;
export const SIGNOUT_CALLBACK_PATH = `${BASE_AUTH_PATH}/signout/callback`;

// DASHBOARD ROUTES
export const DASHBOARD_PATH = "/";

// SEARCH PARAM KEYS OR ROUTE STATES
export const RETURN_URL_SEARCH_PARAM_KEY = "return_url";
export const LOGOUT_SEARCH_PARAM_KEY = "logout";
export const UNAUTHORIZED_SEARCH_PARAM_KEY = "unauthorized";
