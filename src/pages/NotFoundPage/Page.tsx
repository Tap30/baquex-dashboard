import { Exception } from "@/components/Exception";
import { Icon } from "@/components/Icon";
import { DASHBOARD_PATH, LOGIN_PATH } from "@/constants/routes";
import { useAuth } from "@/contexts/Auth";
import { strings } from "@/static-content";
import { mdiGoogleDownasaur } from "@mdi/js";
import { useNavigate } from "react-router";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const actionText = !isAuthenticated
    ? strings.notFound.backToLogin
    : strings.notFound.backToDashboard;

  const actionFn = !isAuthenticated
    ? () => void navigate(LOGIN_PATH)
    : () => void navigate(DASHBOARD_PATH);

  return (
    <Exception
      title={strings.notFound.title}
      description={strings.notFound.description}
      illustration={
        <Icon
          data={mdiGoogleDownasaur}
          color="warn"
        />
      }
      action={{
        text: actionText,
        onClick: actionFn,
      }}
    />
  );
};
