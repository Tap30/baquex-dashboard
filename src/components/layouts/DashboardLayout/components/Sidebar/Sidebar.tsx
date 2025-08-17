import { Flex } from "@components/Flex";
import { Text } from "@components/Text";
import appConfig from "@config";
import { SIDEBAR_ITEMS } from "@constants/sidebar";
import { strings } from "@static-content";
import { cn } from "@utils/cn";
import { memo } from "react";
import { Footer, Item } from "./components/index.ts";
import classes from "./styles.module.css";

const { logo, name } = appConfig;

type Props = {
  className?: string;
  open: boolean;
};

const SidebarBase: React.FC<Props> = props => {
  const { className, open } = props;

  const renderItems = () => {
    return SIDEBAR_ITEMS.map(item => (
      <Item
        key={item.title + item.type}
        item={item}
      />
    ));
  };

  return (
    <aside
      className={cn(classes["root"], className, {
        [classes["open"]!]: open,
      })}
    >
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
          {renderItems()}
        </Flex>
      </nav>
      <Footer className={classes["footer"]} />
    </aside>
  );
};

export const Sidebar = memo(SidebarBase);
