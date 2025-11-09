import { useAuth } from "@services/auth";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export const SignoutCallbackPage: React.FC = () => {
  const { handleSignoutRedirectCallback, isInitialized } = useAuth();

  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (!isInitialized) return;
    if (hasProcessed.current) return;

    const handleCallback = async () => {
      hasProcessed.current = true;

      await handleSignoutRedirectCallback();
    };

    void handleCallback();
  }, [handleSignoutRedirectCallback, isInitialized, navigate]);

  return <></>;
};
