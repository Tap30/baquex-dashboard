import { Exception } from "@components/Exception";
import { Icon } from "@components/Icon";
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  LOGOUT_SEARCH_PARAM_KEY,
  UNAUTHORIZED_SEARCH_PARAM_KEY,
} from "@constants/routes";
import { mdiAccountCancel } from "@mdi/js";
import { useAuth } from "@services/auth";
import { strings } from "@static-content";
import { useSyncWithPageLoader } from "@stores/page-loader";
import { resolveThrowable } from "@utils/resolve-throwable";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export const AccessDeniedPage: React.FC = () => {
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(true);

  const { isAuthenticated, signout, handleSignoutRedirectCallback } = useAuth();
  const [searchParams] = useSearchParams();

  const shouldLogout =
    searchParams && searchParams.get(LOGOUT_SEARCH_PARAM_KEY) === "true";

  const isUnauthorized =
    searchParams && searchParams.get(UNAUTHORIZED_SEARCH_PARAM_KEY) === "true";

  useSyncWithPageLoader(isPending);

  useEffect(() => {
    if (shouldLogout) {
      setIsPending(true);

      void (async () => {
        await resolveThrowable(() => signout());
        await resolveThrowable(() => handleSignoutRedirectCallback());

        setIsPending(false);
      })();
    } else {
      setIsPending(false);
    }
  }, [handleSignoutRedirectCallback, shouldLogout, signout]);

  const { title, description, actionText } = useMemo(() => {
    let strContent: {
      title: string;
      description: string;
      actionText: string;
    } = strings.accessDenied;

    if (isUnauthorized) {
      strContent = strings.notAuthorized;
    } else if (!isAuthenticated) {
      strContent = strings.notAuthenticated;
    }

    return {
      title: strContent.title,
      description: strContent.description,
      actionText: strContent.actionText,
    };
  }, [isAuthenticated, isUnauthorized]);

  const handleActionClick = () => {
    if (!isAuthenticated) {
      void navigate(LOGIN_PATH);
    } else {
      void navigate(DASHBOARD_PATH);
    }
  };

  return (
    <Exception
      title={title}
      description={description}
      action={{
        text: actionText,
        onClick: handleActionClick,
      }}
      illustration={
        <Icon
          data={mdiAccountCancel}
          color="negative"
        />
      }
    />
  );
};
