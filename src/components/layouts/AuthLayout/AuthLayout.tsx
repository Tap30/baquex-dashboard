import { DASHBOARD_PATH } from "@/constants";
import { useAuth } from "@/contexts";
import { Navigate, Outlet } from "react-router";

export const AuthLayout: React.FC = () => {
  const { isAuthenticated, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <div>Authenticating...</div>;
  }

  // If authenticated, redirect to the dashboard page
  if (isAuthenticated) {
    return (
      <Navigate
        to={DASHBOARD_PATH}
        replace
      />
    );
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};
