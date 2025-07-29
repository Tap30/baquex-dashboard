import { Avatar, Flex, FlexItem, Icon, IconButton, Text } from "@/components";
import { SETTINGS_PATH } from "@/constants";
import { useAuth } from "@/contexts";
import { strings } from "@/static-content";
import { cn } from "@/utils";
import { mdiCogs, mdiLogout } from "@mdi/js";
import { Link, useLocation } from "react-router";
import classes from "./styles.module.css";

type Props = {
  className?: string;
};

export const Footer: React.FC<Props> = props => {
  const { className } = props;

  const { pathname } = useLocation();
  const { logout } = useAuth();

  const username = "mostafa.shamsitabar";
  const displayName = "مصطفی شمسی‌تبار";

  const fallbackText = username
    .split(".")
    .map(s => s[0]?.toUpperCase() ?? "")
    .join("");

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
          src=""
          alt=""
          fallback={fallbackText}
        />
        <Flex direction="column">
          <Text variant="subheading2">{displayName}</Text>
          <Text
            variant="caption"
            color="tertiary"
          >
            {username}
          </Text>
        </Flex>
        <FlexItem autoMarginInlineStart>
          <IconButton
            aria-label={strings.logoutButton}
            icon={<Icon data={mdiLogout} />}
            color="neutral"
            variant="ghost"
            onClick={() => void logout()}
          />
        </FlexItem>
      </Flex>
    </footer>
  );
};
