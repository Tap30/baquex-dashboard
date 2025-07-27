import { Flex, Text } from "@/components";
import { SidebarItemTypes, type SidebarGroupItem } from "@/constants";
import { useId } from "react";
import { LeafItem } from "./LeafItem/index.ts";
import { ParentItem } from "./ParentItem/index.ts";

type Props = {
  item: SidebarGroupItem;
};

export const GroupItem: React.FC<Props> = props => {
  const { item } = props;
  const { title, items } = item;

  const nodeId = useId();
  const labelId = `LABEL_${nodeId}`;

  const renderItems = () => {
    return items.map(item => {
      const itemKey = item.title + item.type;

      if (item.type === SidebarItemTypes.LEAF_NODE) {
        return (
          <LeafItem
            key={itemKey}
            item={item}
          />
        );
      } else if (item.type === SidebarItemTypes.PARENT_NODE) {
        return (
          <ParentItem
            key={itemKey}
            item={item}
          />
        );
      }

      return null;
    });
  };

  return (
    <Flex
      role="group"
      direction="column"
      data-item="group"
      aria-labelledby={labelId}
      gap="sm"
    >
      <Text
        as="strong"
        variant="subheading2"
        color="tertiary"
      >
        {title}
      </Text>
      <Flex
        direction="column"
        gap="sm"
      >
        {renderItems()}
      </Flex>
    </Flex>
  );
};
