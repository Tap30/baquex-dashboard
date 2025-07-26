import {
  SidebarItemTypes,
  type SidebarItem as SidebarItemType,
} from "@/constants";
import { GroupItem } from "./GroupItem.tsx";
import { LeafItem } from "./LeafItem/LeafItem.tsx";
import { ParentItem } from "./ParentItem/index.ts";

type Props = {
  item: SidebarItemType;
};

export const Item: React.FC<Props> = props => {
  const { item } = props;

  if (item.type === SidebarItemTypes.GROUP) {
    return <GroupItem item={item} />;
  } else if (item.type === SidebarItemTypes.PARENT_NODE) {
    return <ParentItem item={item} />;
  } else if (item.type === SidebarItemTypes.LEAF_NODE) {
    return <LeafItem item={item} />;
  }

  return null;
};
