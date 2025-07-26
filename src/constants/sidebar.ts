import { strings } from "@/static-content";
import {
  mdiAccountGroup,
  mdiAlien,
  mdiDatabase,
  mdiFileChart,
  mdiGauge,
  mdiGoogleAnalytics,
  mdiTestTube,
} from "@mdi/js";

export const SidebarItemTypes = {
  GROUP: "GROUP",
  LEAF_NODE: "LEAF_NODE",
  PARENT_NODE: "PARENT_NODE",
} as const;

export type SidebarItemType =
  (typeof SidebarItemTypes)[keyof typeof SidebarItemTypes];

export type SidebarGroupItem = {
  type: typeof SidebarItemTypes.GROUP;
  title: string;
  items: SidebarNodeItem[];
};

export type SidebarLeafNodeItem = {
  type: typeof SidebarItemTypes.LEAF_NODE;
  title: string;
  iconData: string;
  href: string;
};

export type SidebarParentNodeItem = {
  type: typeof SidebarItemTypes.PARENT_NODE;
  title: string;
  iconData: string;
  items: SidebarLeafNodeItem[];
};

type SidebarNodeItem = SidebarLeafNodeItem | SidebarParentNodeItem;
export type SidebarItem = SidebarNodeItem | SidebarGroupItem;

const str = strings.sidebar;

export const SIDEBAR_ITEMS = [
  {
    type: SidebarItemTypes.LEAF_NODE,
    title: str.dashboard,
    iconData: mdiGauge,
    href: "",
  },
  {
    type: SidebarItemTypes.LEAF_NODE,
    title: str.analytics,
    iconData: mdiGoogleAnalytics,
    href: "",
  },
  {
    type: SidebarItemTypes.PARENT_NODE,
    title: str.team.title,
    iconData: mdiAccountGroup,
    items: [
      {
        type: SidebarItemTypes.LEAF_NODE,
        title: str.team.dev,
        iconData: mdiAlien,
        href: "",
      },
      {
        type: SidebarItemTypes.LEAF_NODE,
        title: str.team.qa,
        iconData: mdiTestTube,
        href: "",
      },
    ],
  },
  {
    type: SidebarItemTypes.GROUP,
    title: str.groups.documents.title,
    items: [
      {
        type: SidebarItemTypes.LEAF_NODE,
        title: str.groups.documents.dataLib,
        iconData: mdiDatabase,
        href: "",
      },
      {
        type: SidebarItemTypes.LEAF_NODE,
        title: str.groups.documents.reports,
        iconData: mdiFileChart,
        href: "",
      },
    ],
  },
] as const satisfies SidebarItem[];
