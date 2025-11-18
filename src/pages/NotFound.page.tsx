import { Exception } from "@components/Exception";
import { Icon } from "@components/Icon";
import { DASHBOARD_PATH } from "@constants/routes";
import { mdiGoogleDownasaur } from "@mdi/js";
import { strings } from "@static-content";
import { useNavigate } from "react-router";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const actionText = strings.notFound.backToDashboard;
  const actionFn = () => void navigate(DASHBOARD_PATH);

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
