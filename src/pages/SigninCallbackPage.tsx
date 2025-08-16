import { toast } from "@/components";
import { LOGIN_PATH, UNAUTHORIZED_PATH } from "@/constants";
import { useAuth } from "@/contexts";
import { InvalidUserError } from "@/services";
import { strings } from "@/static-content";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const SigninCallbackPage = () => {
  const { handleSigninRedirectCallback, isInitialized } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitialized) return;

    const handleCallback = async () => {
      try {
        await handleSigninRedirectCallback();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        const queryParams = new URLSearchParams(window.location.search);
        const errorType = queryParams.get("error");

        switch (errorType) {
          case "access_denied":
            return navigate(UNAUTHORIZED_PATH, { replace: true });

          default: {
            if (err instanceof InvalidUserError) {
              toast({ title: strings.errors.invalidUser, color: "negative" });

              await navigate(LOGIN_PATH, { replace: true });
            } else {
              throw err;
            }
          }
        }
      }
    };

    void handleCallback();
  }, [handleSigninRedirectCallback, navigate, isInitialized]);

  return <></>;
};
