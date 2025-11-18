import { Exception } from "@components/Exception";
import { Icon } from "@components/Icon";
import { DASHBOARD_PATH } from "@constants/routes";
import { mdiAccountCancel } from "@mdi/js";
import { strings } from "@static-content";
import { useNavigate } from "react-router";

export const AccessDeniedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleActionClick = () => {
    void navigate(DASHBOARD_PATH);
  };

  return (
    <Exception
      title={strings.accessDenied.title}
      description={strings.accessDenied.description}
      action={{
        text: strings.accessDenied.actionText,
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
