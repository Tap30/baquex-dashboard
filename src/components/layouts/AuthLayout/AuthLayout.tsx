import { PageLoading } from "@components/PageLoading";
import { DASHBOARD_PATH } from "@constants/routes";
import { useAuth } from "@contexts/Auth";
import { Navigate, Outlet } from "react-router";

export const AuthLayout: React.FC = () => {
  const { isAuthenticated, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <PageLoading loading />;
  }

  // If not authenticated, render the login page
  if (!isAuthenticated) {
    return (
      <main>
        <Outlet />
      </main>
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
