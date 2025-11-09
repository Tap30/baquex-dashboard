import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  RETURN_URL_SEARCH_PARAM_KEY,
} from "@constants/routes";
import { useAuth } from "@services/auth";
import { useReturnUrl } from "@utils/use-return-url";
import { Navigate, Outlet } from "react-router";

export const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const returnUrl = useReturnUrl({
    dashboardRoutePath: DASHBOARD_PATH,
    loginRoutePath: LOGIN_PATH,
    searchParamKey: RETURN_URL_SEARCH_PARAM_KEY,
  });

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
      to={returnUrl.getUrl()}
      replace
    />
  );
};
