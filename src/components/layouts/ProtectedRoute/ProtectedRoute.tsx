import { LOGIN_PATH, UNAUTHORIZED_PATH } from "@/constants";
import { useAuth } from "@/contexts";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const { isAuthenticated, isAuthenticating, isAccessGranted } = useAuth();

  if (isAuthenticating) {
    return <div>Authenticating...</div>;
  }

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return (
      <Navigate
        to={LOGIN_PATH}
        replace
      />
    );
  }

  // If authenticated but scope access is not granted, redirect to an unauthorized page
  if (!isAccessGranted) {
    return (
      <Navigate
        to={UNAUTHORIZED_PATH}
        replace
      />
    );
  }

  return <Outlet />;
};
