import {
  dismissConfirm,
  requestConfirm,
} from "@components/AlertDialogController";
import { Avatar } from "@components/Avatar";
import { Flex, FlexItem } from "@components/Flex";
import { Icon } from "@components/Icon";
import { IconButton } from "@components/IconButton";
import { Text } from "@components/Text";
import { mdiLogout } from "@mdi/js";
import { useAuth } from "@services/auth";
import { strings } from "@static-content";
import { cn } from "@utils/cn";
import { resolveThrowable } from "@utils/resolve-throwable";
import classes from "./styles.module.css";

type Props = {
  className?: string;
};

export const Footer: React.FC<Props> = props => {
  const { className } = props;

  const { signout, user } = useAuth();

  const { name, email } = user!;

  const username = name ?? strings.unknownUser;

  const fallbackText = username
    .split(/[. ]/)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase() ?? "")
    .join("");

  const handleSignout = () => {
    void requestConfirm({
      title: strings.logoutButton,
      description: strings.areYouSure,
      okText: strings.logoutButton,
      onOk: () => {
        void (async () => {
          await resolveThrowable(() => signout());
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
            onClick={handleSignout}
          />
        </FlexItem>
      </Flex>
    </footer>
  );
};
