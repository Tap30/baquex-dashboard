import { LOGIN_PATH } from "@/constants";
import { useAuth } from "@/contexts";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const { isAuthenticated, isAuthenticating } = useAuth();

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

  return <Outlet />;
};
