import { SuspenseFallback } from "@components/SuspenseFallback";
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  RETURN_URL_SEARCH_PARAM_KEY,
} from "@constants/routes";
import { useAuth } from "@services/auth";
import { useReturnUrl } from "@utils/use-return-url";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  const returnUrl = useReturnUrl({
    dashboardRoutePath: DASHBOARD_PATH,
    loginRoutePath: LOGIN_PATH,
    searchParamKey: RETURN_URL_SEARCH_PARAM_KEY,
  });

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return (
      <Navigate
        to={returnUrl.createUrl()}
        replace
      />
    );
  }

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Outlet />
    </Suspense>
  );
};
