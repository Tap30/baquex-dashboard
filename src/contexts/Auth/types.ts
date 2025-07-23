import type { LoginCredentials } from "@/services";

export type AuthContextValue = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
};
