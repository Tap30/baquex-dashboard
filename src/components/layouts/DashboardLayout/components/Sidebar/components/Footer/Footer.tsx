import {
  dismissConfirm,
  requestConfirm,
} from "@components/AlertDialogController";
import { Avatar } from "@components/Avatar";
import { Flex, FlexItem } from "@components/Flex";
import { Icon } from "@components/Icon";
import { IconButton } from "@components/IconButton";
import { Text } from "@components/Text";
import { LOGOUT_PATH } from "@constants/routes";
import { Dashboard } from "@entities/dashboard";
import { mdiLogout } from "@mdi/js";
import { strings } from "@static-content";
import { cn } from "@utils/cn";
import { useNavigate } from "react-router";
import classes from "./styles.module.css";

type Props = {
  className?: string;
};

export const Footer: React.FC<Props> = props => {
  const { className } = props;

  const navigate = useNavigate();

  const { email, name } = Dashboard.hooks.useUserProfile();

  const username = name ?? strings.unknownUser;

  const fallbackText = username
    .split(/[. ]/)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase() ?? "")
    .join("");

  const handleLogout = () => {
    void requestConfirm({
      title: strings.logoutButton,
      description: strings.areYouSure,
      okText: strings.logoutButton,
      onOk: () => {
        void (async () => {
          await navigate(LOGOUT_PATH);
          await dismissConfirm();
        })();
      },
      onCancel: () => {
        void dismissConfirm();
      },
    });
  };

  return (
    <footer className={cn(classes["root"], className)}>
      <Flex
        alignItems="center"
        gap="sm"
        className={classes["account"]}
      >
        <Avatar
          className={classes["avatar"]}
          src={""}
          alt={username}
          fallback={fallbackText}
        />
        <Flex
          direction="column"
          className={classes["content"]}
        >
          <Text variant="subheading2">{username}</Text>
          <Text
            variant="caption"
            color="tertiary"
          >
            {email}
          </Text>
        </Flex>
        <FlexItem shrink={0}>
          <IconButton
            aria-label={strings.logoutButton}
            icon={<Icon data={mdiLogout} />}
            color="neutral"
            variant="ghost"
            onClick={handleLogout}
          />
        </FlexItem>
      </Flex>
    </footer>
  );
};
