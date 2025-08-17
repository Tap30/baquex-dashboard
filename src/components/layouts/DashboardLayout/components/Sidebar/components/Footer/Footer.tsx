import {
  dismissConfirm,
  requestConfirm,
} from "@/components/AlertDialogController";
import { Avatar } from "@/components/Avatar";
import { Flex, FlexItem } from "@/components/Flex";
import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { Text } from "@/components/Text";
import { SETTINGS_PATH } from "@/constants/routes";
import { useAuth } from "@/contexts/Auth";
import { strings } from "@/static-content";
import { cn } from "@/utils/cn";
import { mdiCogs, mdiLogout } from "@mdi/js";
import { Link, useLocation } from "react-router";
import classes from "./styles.module.css";

type Props = {
  className?: string;
};

export const Footer: React.FC<Props> = props => {
  const { className } = props;

  const { pathname } = useLocation();
  const { signout, handleSignoutRedirectCallback, user } = useAuth();

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
          await signout().finally(
            void (async () => {
              void handleSignoutRedirectCallback();
              await dismissConfirm();
            })(),
          );
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
        as={Link}
        gap="sm"
        to={"/"}
        alignItems="center"
        className={cn(classes["settings"], {
          [classes["active"]!]: pathname === SETTINGS_PATH,
        })}
      >
        <Icon
          data={mdiCogs}
          size={16}
        />
        <Text
          variant="subheading1"
          as="strong"
        >
          {strings.pages.settings.title}
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        gap="sm"
        className={classes["account"]}
      >
        <Avatar
          src={""}
          alt={username}
          fallback={fallbackText}
        />
        <Flex direction="column">
          <Text variant="subheading2">{username}</Text>
          <Text
            variant="caption"
            color="tertiary"
          >
            {email}
          </Text>
        </Flex>
        <FlexItem autoMarginInlineStart>
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
