import { Icon, Text } from "@/components";
import type { SidebarParentNodeItem } from "@/constants";
import { useLazyInitializedValue } from "@/utils";
import { mdiChevronDown } from "@mdi/js";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { useLocation } from "react-router";
import { LeafItem } from "../LeafItem/LeafItem.tsx";
import classes from "./styles.module.css";

type Props = {
  item: SidebarParentNodeItem;
};

export const ParentItem: React.FC<Props> = props => {
  const { item } = props;
  const { iconData, title, items } = item;

  const { pathname } = useLocation();

  const isExpanded = useLazyInitializedValue(() => {
    return items.some(item => item.href === pathname);
  });

  const renderItems = () => {
    return items.map(item => (
      <LeafItem
        key={item.title + item.type}
        item={item}
      />
    ));
  };

  return (
    <CollapsiblePrimitive.Root
      defaultOpen={isExpanded}
      className={classes["root"]}
    >
      <CollapsiblePrimitive.Trigger className={classes["trigger"]}>
        <Icon
          data={iconData}
          size={16}
        />
        <Text
          variant="subheading1"
          as="strong"
          className={classes["title"]}
        >
          {title}
        </Text>
        <Icon
          data={mdiChevronDown}
          size={16}
        />
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className={classes["content"]}>
        {renderItems()}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
};
