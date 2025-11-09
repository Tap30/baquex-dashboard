import { persistedStorage } from "@services/storage";
import { resolveThrowable } from "@utils/resolve-throwable";
import { usePersistedState } from "@utils/use-persisted-state";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type AuthenticationClient } from "./AuthenticationClient.ts";
import { AuthContext } from "./Context.ts";
import { InvalidUserError, UnauthenticatedError } from "./errors.ts";
import type { AuthContextValue, AuthenticatedUser } from "./types.ts";

export type AuthProviderProps = React.PropsWithChildren<{
  client: AuthenticationClient;
}>;

export const AuthProvider: React.FC<AuthProviderProps> = props => {
  const { client, children } = props;

  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = usePersistedState(false, {
    name: "auth.is",
    storage: persistedStorage,
  });

  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const resetAuthState = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAuthenticating(false);
  }, [setIsAuthenticated, setUser]);

  const setAuthenticatedUser = useCallback(
    (authenticatedUser: AuthenticatedUser) => {
      setUser(authenticatedUser);
      setIsAuthenticated(true);
      setIsAuthenticating(false);
    },
    [setIsAuthenticated, setUser],
  );

  useEffect(() => {
    const initializeAuth = async () => {
      const authenticatedUser = await client.getAuthenticatedUser();

      if (!authenticatedUser || !(await client.checkScopeAccess())) {
        resetAuthState();
        setIsInitialized(true);

        return;
      }

      setAuthenticatedUser(authenticatedUser);
      setIsInitialized(true);
    };

    void initializeAuth();
  }, [client, resetAuthState, setAuthenticatedUser]);

  const handleSigninRedirectCallback: AuthContextValue["handleSigninRedirectCallback"] =
    useCallback(async () => {
      setIsAuthenticating(true);

      const authenticatedUser = await client.handleSigninRedirectCallback();

      if (!authenticatedUser) {
        resetAuthState();

        throw new InvalidUserError();
      }

      if (!(await client.checkScopeAccess())) {
        resetAuthState();

        throw new UnauthenticatedError();
      }

      setAuthenticatedUser(authenticatedUser);

      return authenticatedUser;
    }, [client, resetAuthState, setAuthenticatedUser]);

  const handleSignoutRedirectCallback: AuthContextValue["handleSignoutRedirectCallback"] =
    useCallback(async () => {
      setIsAuthenticating(true);

      const { error } = await resolveThrowable(() =>
        client.handleSignoutRedirectCallback(),
      );

      resetAuthState();

      // eslint-disable-next-line no-console
      if (error) console.error(error);
    }, [client, resetAuthState]);

  const signin: AuthContextValue["signin"] = useCallback(
    async params => {
      setIsAuthenticating(true);

      await client.signin(params);
    },
    [client],
  );

  const signout: AuthContextValue["signout"] = useCallback(async () => {
    setIsAuthenticating(true);

    await client.signout();
  }, [client]);

  const context: AuthContextValue = useMemo(
    () =>
      ({
        user,
        isAuthenticated,
        isInitialized,
        isAuthenticating,
        signin,
        signout,
        handleSigninRedirectCallback,
        handleSignoutRedirectCallback,
      }) satisfies AuthContextValue,
    [
      user,
      isAuthenticated,
      isInitialized,
      isAuthenticating,
      signin,
      signout,
      handleSigninRedirectCallback,
      handleSignoutRedirectCallback,
    ],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
