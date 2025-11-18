import { Exception } from "@components/Exception";
import { Icon } from "@components/Icon";
import { mdiGoogleDownasaur } from "@mdi/js";
import { strings } from "@static-content";

const { title, actionText, description } = strings.genericError;

export const ErrorPage: React.FC = () => {
  return (
    <Exception
      title={title}
      description={description}
      illustration={
        <Icon
          data={mdiGoogleDownasaur}
          color="warn"
        />
      }
      action={{
        text: actionText,
        onClick: () => {
          window.location.reload();
        },
      }}
    />
  );
};
