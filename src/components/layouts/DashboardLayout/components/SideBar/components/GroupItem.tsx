import { SidebarItemTypes, type SidebarGroupItem } from "@/constants";
import { useId } from "react";
import { Flex, Text } from "../../../../../elements/index.ts";
import { LeafItem } from "./LeafItem/LeafItem.tsx";
import { ParentItem } from "./ParentItem/ParentItem.tsx";

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
        alignItems="start"
        gap="sm"
      >
        {renderItems()}
      </Flex>
    </Flex>
  );
};
