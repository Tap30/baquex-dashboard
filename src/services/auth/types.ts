import type { SigninParams } from "./strategies/Strategy.ts";

export type AuthenticatedUser = {
  id: string;
  name?: string;
  email?: string;
  token: string;
  tokenType: string;
  expiresAt: number;
  state?: Record<PropertyKey, unknown>;
};

export type AuthContextValue = {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isAuthenticating: boolean;
  signin: (params?: SigninParams) => Promise<void>;
  signout: () => Promise<void>;
  handleSignoutRedirectCallback: () => Promise<void>;
  handleSigninRedirectCallback: () => Promise<AuthenticatedUser | null>;
};
