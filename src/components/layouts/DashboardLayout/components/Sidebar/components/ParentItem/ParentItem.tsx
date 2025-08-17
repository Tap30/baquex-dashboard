import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import type { SidebarParentNodeItem } from "@constants/sidebar";
import { mdiChevronDown } from "@mdi/js";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { useLazyInitializedValue } from "@utils/use-lazy-initialized-value";
import { useLocation } from "react-router";
import { LeafItem } from "../LeafItem/index.ts";
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
      data-item="parent"
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
