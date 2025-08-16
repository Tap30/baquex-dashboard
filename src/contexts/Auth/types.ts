import type { AuthenticatedUser } from "@/services";

export type AuthContextValue = {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isAuthenticating: boolean;
  signin: (credentials?: unknown) => Promise<void>;
  signout: () => Promise<void>;
  handleSignoutRedirectCallback: () => Promise<void>;
  handleSigninRedirectCallback: () => Promise<void>;
};
