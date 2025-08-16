import { PageLoading } from "@/components";
import { LOGIN_PATH } from "@/constants";
import { useAuth } from "@/contexts";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const { isAuthenticated, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <PageLoading loading />;
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

  // If authenticated and scope access is granted, render the dashboard page
  return <Outlet />;
};
