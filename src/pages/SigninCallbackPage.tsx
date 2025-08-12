import { useAuth } from "@/contexts";
import { useEffect } from "react";

export const SigninCallbackPage = () => {
  const { handleSigninRedirectCallback, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;

    const handleCallback = async () => {
      await handleSigninRedirectCallback();
    };

    void handleCallback();
  }, [handleSigninRedirectCallback, isInitialized]);

  return <></>;
};
