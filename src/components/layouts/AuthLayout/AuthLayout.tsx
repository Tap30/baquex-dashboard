import { DASHBOARD_PATH, UNAUTHORIZED_PATH } from "@/constants";
import { useAuth } from "@/contexts";
import { Navigate, Outlet } from "react-router";

export const AuthLayout: React.FC = () => {
  const { isAuthenticated, isAuthenticating, isAccessGranted } = useAuth();

  if (isAuthenticating) {
    return <div>Authenticating...</div>;
  }

  // If not authenticated, render the login page
  if (!isAuthenticated) {
    return (
      <main>
        <Outlet />
      </main>
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

  // If authenticated and scope access is granted, redirect to the dashboard page
  return (
    <Navigate
      to={DASHBOARD_PATH}
      replace
    />
  );
};
