import { toast } from "@components/Toaster";
import { Code, ConnectError, type Interceptor } from "@connectrpc/connect";
import {
  ACCESS_DENIED_PATH,
  LOGOUT_SEARCH_PARAM_KEY,
  UNAUTHORIZED_SEARCH_PARAM_KEY,
} from "@constants/routes";
import { strings } from "@static-content";
import { globalNavigator } from "@utils/navigator";

export const authCheckerInterceptor: Interceptor = next => async req => {
  try {
    return await next(req);
  } catch (error) {
    if (error instanceof ConnectError && error.code === Code.Unauthenticated) {
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
    }

    throw error;
  }
};
