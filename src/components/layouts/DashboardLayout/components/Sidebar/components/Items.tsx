import { Flex } from "@components/Flex";
import { DASHBOARD_PATH } from "@constants/routes";
import { SidebarItemTypes } from "@constants/sidebar";
import { mdiViewDashboard } from "@mdi/js";
import { strings } from "@static-content";
import type { SidebarItem } from "@types";
import { memo } from "react";
import { GroupItem } from "./GroupItem.tsx";
import { LeafItem } from "./LeafItem/LeafItem.tsx";
import { ParentItem } from "./ParentItem/ParentItem.tsx";

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    type: "LEAF_NODE",
    href: DASHBOARD_PATH,
    iconData: mdiViewDashboard,
    title: strings.pages.dashboard.title,
  },
];

const ItemsImpl = () => {
  const renderItem = (item: SidebarItem) => {
    const key = item.title + item.type;

    if (item.type === SidebarItemTypes.GROUP) {
      return (
        <GroupItem
          key={key}
          item={item}
        />
      );
    } else if (item.type === SidebarItemTypes.PARENT_NODE) {
      return (
        <ParentItem
          key={key}
          item={item}
        />
      );
    } else if (item.type === SidebarItemTypes.LEAF_NODE) {
      return (
        <LeafItem
          key={key}
          item={item}
        />
      );
    }

    return null;
  };

  return (
    <Flex
      direction="column"
      gap="sm"
    >
      {SIDEBAR_ITEMS.map(renderItem)}
    </Flex>
  );
};

export const Items = memo(ItemsImpl);
