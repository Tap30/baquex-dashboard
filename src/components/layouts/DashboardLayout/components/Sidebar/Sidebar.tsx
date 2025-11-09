import { Flex } from "@components/Flex";
import { Text } from "@components/Text";
import appConfig from "@config";
import { strings } from "@static-content";
import { cn } from "@utils/cn";
import { memo } from "react";
import { Footer, Items } from "./components/index.internal.ts";
import classes from "./styles.module.css";

const { logo, name } = appConfig;

type Props = {
  className?: string;
};

const SidebarBase: React.FC<Props> = props => {
  const { className } = props;

  return (
    <aside className={cn(classes["root"], className)}>
      <Flex
        aria-hidden
        className={classes["logo"]}
        alignItems="center"
        gap="sm"
      >
        <img
          src={logo}
          alt="Logo"
        />
        <Text
          variant="h6"
          weight={700}
        >
          {name}
        </Text>
      </Flex>
      <nav
        className={classes["nav"]}
        aria-label={strings.sidebar}
      >
        <Flex
          direction="column"
          gap="sm"
        >
          <Items />
        </Flex>
      </nav>
      <Footer className={classes["footer"]} />
    </aside>
  );
};

export const Sidebar = memo(SidebarBase);
