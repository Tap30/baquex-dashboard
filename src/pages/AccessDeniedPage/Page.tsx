import { Exception } from "@/components/Exception";
import { Icon } from "@/components/Icon";
import { DASHBOARD_PATH, LOGIN_PATH } from "@/constants/routes";
import { useAuth } from "@/contexts/Auth";
import { strings } from "@/static-content";
import { mdiAccountCancel } from "@mdi/js";
import { useNavigate } from "react-router";

export const AccessDeniedPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const title = !isAuthenticated
    ? strings.notAuthenticated.title
    : strings.accessDenied.title;

  const description = !isAuthenticated
    ? strings.notAuthenticated.description
    : strings.accessDenied.description;

  const actionText = !isAuthenticated
    ? strings.notAuthenticated.backToLogin
    : strings.accessDenied.backToDashboard;

  const actionFn = !isAuthenticated
    ? () => void navigate(LOGIN_PATH)
    : () => void navigate(DASHBOARD_PATH);

  return (
    <Exception
      title={title}
      description={description}
      action={{
        text: actionText,
        onClick: actionFn,
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
