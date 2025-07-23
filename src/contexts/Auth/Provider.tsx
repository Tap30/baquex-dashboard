import { auth, type LoginCredentials } from "@/services";
import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./Context.ts";
import { type AuthContextValue } from "./types.ts";

type Props = React.PropsWithChildren;

export const AuthProvider: React.FC<Props> = props => {
  const { children } = props;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsAuthenticating(true);

    try {
      const success = await auth.login(credentials);

      if (success) {
        setIsAuthenticated(true);
        setIsAuthenticating(false);

        return true;
      }

      setIsAuthenticated(false);
      setIsAuthenticating(false);

      return false;
    } catch {
      setIsAuthenticated(false);
      setIsAuthenticating(false);

      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await auth.logout();

    setIsAuthenticated(false);
    setIsAuthenticating(false);
  }, []);

  const context = useMemo<AuthContextValue>(() => {
    return {
      isAuthenticated,
      isAuthenticating,
      login,
      logout,
    };
  }, [isAuthenticated, isAuthenticating, login, logout]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
