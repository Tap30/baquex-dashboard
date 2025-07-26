import logoSvg from "@/assets/logo.svg";
import { Flex, Text } from "@/components";
import { SIDEBAR_ITEMS } from "@/constants";
import { strings } from "@/static-content";
import { cn } from "@/utils";
import { memo } from "react";
import { Item } from "./components/index.ts";
import classes from "./styles.module.css";

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
          src={logoSvg}
          alt="Logo"
        />
        <Text variant="h6">baquex</Text>
      </Flex>
      <nav
        className={classes["nav"]}
        aria-label={strings.sidebar.title}
      >
        <Flex
          direction="column"
          gap="sm"
          alignItems="start"
        >
          {renderItems()}
        </Flex>
      </nav>
    </aside>
  );
};

export const Sidebar = memo(SidebarBase);
