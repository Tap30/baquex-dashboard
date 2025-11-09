import { sanitizeRelativeInternalUrl } from "@utils/sanitize";
import { useCallback } from "react";
import { useLocation } from "react-router";

export const useReturnUrl = (params: {
  searchParamKey: string;
  dashboardRoutePath: string;
  loginRoutePath: string;
}) => {
  const { dashboardRoutePath, loginRoutePath, searchParamKey } = params;

  const location = useLocation();

  const getUrl = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const returnUrl = searchParams.get(searchParamKey);

    let safeReturnUrl = dashboardRoutePath;

    if (returnUrl) {
      try {
        safeReturnUrl = sanitizeRelativeInternalUrl(returnUrl);
      } catch {
        safeReturnUrl = dashboardRoutePath;
      }
    }

    return safeReturnUrl;
  }, [dashboardRoutePath, location.search, searchParamKey]);

  const createUrl = useCallback(() => {
    const returnUrl = location.pathname + location.search;
    const safeReturnUrl = sanitizeRelativeInternalUrl(returnUrl);

    return `${loginRoutePath}?${searchParamKey}=${encodeURIComponent(safeReturnUrl)}`;
  }, [location.pathname, location.search, loginRoutePath, searchParamKey]);

  return {
    getUrl,
    createUrl,
  };
};
