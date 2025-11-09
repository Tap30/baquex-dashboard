import { toast } from "@components/Toaster";
import {
  ACCESS_DENIED_PATH,
  LOGOUT_SEARCH_PARAM_KEY,
  UNAUTHORIZED_SEARCH_PARAM_KEY,
} from "@constants/routes";
import { strings } from "@static-content";
import { globalNavigator } from "@utils/navigator";
import type { ResponseInterceptorError } from "../types.ts";
import { createApiError, isApiError } from "../utils.ts";

export const unauthenticatedErrorInterceptor: ResponseInterceptorError =
  error => {
    if (isApiError(error) && error.status === 401) {
      const { title, description } = strings.notAuthenticated;

      toast({
        title,
        description,
        color: "negative",
      });

      const searchParams = new URLSearchParams({
        [LOGOUT_SEARCH_PARAM_KEY]: "true",
        [UNAUTHORIZED_SEARCH_PARAM_KEY]: "true",
      }).toString();

      void globalNavigator.navigate(
        {
          pathname: ACCESS_DENIED_PATH,
          search: `?${searchParams}`,
        },
        {
          replace: true,
        },
      );

      return error;
    }

    return createApiError(error);
  };
