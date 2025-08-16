import { auth, InvalidUserError, type AuthenticatedUser } from "@/services";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./Context.ts";
import { type AuthContextValue } from "./types.ts";

type Props = React.PropsWithChildren;

export const AuthProvider: React.FC<Props> = props => {
  const { children } = props;

  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Checks for an existing user and their scope access on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsAuthenticating(true);

      let authenticatedUser: AuthenticatedUser | null = null;

      try {
        authenticatedUser = await auth.getAuthenticatedUser();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        authenticatedUser = null;
      }

      if (!authenticatedUser) {
        setUser(null);
        setIsAuthenticated(false);
        setIsAuthenticating(false);
        setIsInitialized(true);

        throw new InvalidUserError();
      }

      const hasScopeAccess = await auth.checkScopeAccess();

      if (!hasScopeAccess) {
        setUser(null);
        setIsAuthenticated(false);
        setIsAuthenticating(false);
        setIsInitialized(true);

        return;
      }

      if (authenticatedUser) {
        setUser(authenticatedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsAuthenticating(false);
      setIsInitialized(true);
    };

    void initializeAuth();
  }, []);

  const handleSigninRedirectCallback = useCallback(async () => {
    setIsAuthenticating(true);

    let authenticatedUser: AuthenticatedUser | null = null;

    try {
      authenticatedUser = await auth.handleSigninRedirectCallback();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      authenticatedUser = null;
    }

    if (!authenticatedUser) {
      setUser(null);
      setIsAuthenticated(false);
      setIsAuthenticating(false);

      throw new InvalidUserError();
    }

    const hasScopeAccess = await auth.checkScopeAccess();

    if (!hasScopeAccess) {
      setUser(null);
      setIsAuthenticated(false);
      setIsAuthenticating(false);

      return;
    }

    if (authenticatedUser) {
      setUser(authenticatedUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }

    setIsAuthenticating(false);
  }, []);

  const handleSignoutRedirectCallback = useCallback(async () => {
    setIsAuthenticating(true);

    await auth.handleSignoutRedirectCallback();

    setUser(null);
    setIsAuthenticated(false);
    setIsAuthenticating(false);
  }, []);

  const signin = useCallback(async () => {
    setIsAuthenticating(true);

    await auth.signin();
  }, []);

  const signout = useCallback(async () => {
    setIsAuthenticating(true);

    await auth.signout();
  }, []);

  const context = useMemo(() => {
    return {
      user,
      isAuthenticated,
      isInitialized,
      isAuthenticating,
      signin,
      signout,
      handleSigninRedirectCallback,
      handleSignoutRedirectCallback,
    } satisfies AuthContextValue;
  }, [
    user,
    isAuthenticated,
    isInitialized,
    isAuthenticating,
    signin,
    signout,
    handleSigninRedirectCallback,
    handleSignoutRedirectCallback,
  ]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
