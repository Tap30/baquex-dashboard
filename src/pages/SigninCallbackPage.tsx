import { UNAUTHORIZED_PATH } from "@/constants";
import { useAuth } from "@/contexts";
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

          default:
            return;
        }
      }
    };

    void handleCallback();
  }, [handleSigninRedirectCallback, navigate, isInitialized]);

  return <></>;
};
