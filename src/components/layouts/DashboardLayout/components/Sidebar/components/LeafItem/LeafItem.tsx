import { Flex, Icon, Text } from "@/components";
import type { SidebarLeafNodeItem } from "@/constants";
import { cn } from "@/utils";
import { Link, useLocation } from "react-router";
import classes from "./styles.module.css";

type Props = {
  item: SidebarLeafNodeItem;
};

export const LeafItem: React.FC<Props> = props => {
  const { item } = props;
  const { iconData, title, href } = item;

  const { pathname } = useLocation();

  const isActive = href === pathname;

  return (
    <Flex
      as={Link}
      to={href}
      aria-current={isActive ? "page" : undefined}
      alignItems="center"
      gap="sm"
      data-item="leaf"
      className={cn(classes["root"], {
        [classes["active"]!]: isActive,
      })}
    >
      <Icon
        data={iconData}
        size={16}
      />
      <Text
        variant="subheading1"
        as="strong"
      >
        {title}
      </Text>
    </Flex>
  );
};
