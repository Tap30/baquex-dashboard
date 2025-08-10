import { auth, type AuthenticatedUser } from "@/services";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./Context.ts";
import { type AuthContextValue } from "./types.ts";

type Props = React.PropsWithChildren;

export const AuthProvider: React.FC<Props> = props => {
  const { children } = props;

  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Checks for an existing user and their scope access on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsAuthenticating(true);
      const authenticatedUser = await auth.getAuthenticatedUser();
      const accessGranted = authenticatedUser
        ? await auth.checkScopeAccess()
        : false;

      if (authenticatedUser) {
        setUser(authenticatedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsAccessGranted(accessGranted);
      setIsAuthenticating(false);
    };

    initializeAuth();
  }, []);

  const handleSigninRedirectCallback = useCallback(async () => {
    setIsAuthenticating(true);

    const authenticatedUser = await auth.handleSigninRedirectCallback();
    const accessGranted = authenticatedUser
      ? await auth.checkScopeAccess()
      : false;

    if (authenticatedUser) {
      setUser(authenticatedUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }

    setIsAccessGranted(accessGranted);
    setIsAuthenticating(false);
  }, []);

  const handleSignoutRedirectCallback = useCallback(async () => {
    setIsAuthenticating(true);

    await auth.handleSignoutRedirectCallback();

    setUser(null);
    setIsAuthenticated(false);
    setIsAccessGranted(false);
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
      isAuthenticating,
      isAccessGranted,
      signin,
      signout,
      handleSigninRedirectCallback,
      handleSignoutRedirectCallback,
    } satisfies AuthContextValue;
  }, [
    user,
    isAuthenticated,
    isAuthenticating,
    isAccessGranted,
    signin,
    signout,
    handleSigninRedirectCallback,
    handleSignoutRedirectCallback,
  ]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
