import { toast } from "@components/Toaster";
import {
  ACCESS_DENIED_PATH,
  DASHBOARD_PATH,
  LOGIN_PATH,
  LOGOUT_SEARCH_PARAM_KEY,
  UNAUTHORIZED_SEARCH_PARAM_KEY,
} from "@constants/routes";
import {
  InvalidUserError,
  UnauthenticatedError,
  useAuth,
} from "@services/auth";
import { strings } from "@static-content";
import { extractErrorMessage } from "@utils/extract-error-message";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "./requests.ts";

export const SigninCallbackPage: React.FC = () => {
  const { handleSigninRedirectCallback, isInitialized } = useAuth();

  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (!isInitialized) return;
    if (hasProcessed.current) return;

    const handleCallback = async () => {
      hasProcessed.current = true;

      try {
        const user = await handleSigninRedirectCallback();

        await registerUser();

        const returnUrl =
          (user?.state?.["returnUrl"] as string) || DASHBOARD_PATH;

        void navigate(returnUrl);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        const queryParams = new URLSearchParams(window.location.search);
        const errorType = queryParams.get("error");

        switch (errorType) {
          case "access_denied":
            return navigate(ACCESS_DENIED_PATH, { replace: true });

          default: {
            if (err instanceof InvalidUserError) {
              const { title, description } = strings.invalidUserError;

              toast({
                title,
                description,
                color: "negative",
              });

              void navigate(LOGIN_PATH, { replace: true });

              return;
            }

            if (err instanceof UnauthenticatedError) {
              const { title, description } = strings.notAuthorized;

              toast({
                title,
                description,
                color: "negative",
              });

              const searchParams = new URLSearchParams({
                [LOGOUT_SEARCH_PARAM_KEY]: "true",
                [UNAUTHORIZED_SEARCH_PARAM_KEY]: "true",
              }).toString();

              void navigate(
                {
                  pathname: ACCESS_DENIED_PATH,
                  search: `?${searchParams}`,
                },
                {
                  replace: true,
                },
              );

              return;
            }

            // eslint-disable-next-line no-console
            console.error(err);

            toast({
              title: strings.error,
              description: extractErrorMessage(err),
              color: "negative",
            });

            void navigate(LOGIN_PATH, {
              replace: true,
            });
          }
        }
      }
    };

    void handleCallback();
  }, [handleSigninRedirectCallback, navigate, isInitialized]);

  return <></>;
};
