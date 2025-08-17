import {
  mdiAccountGroup,
  mdiAlien,
  mdiDatabase,
  mdiFileChart,
  mdiGauge,
  mdiGoogleAnalytics,
  mdiTestTube,
} from "@mdi/js";
import { strings } from "@static-content";

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

const str = strings.pages;

export const SIDEBAR_ITEMS = [
  {
    type: SidebarItemTypes.LEAF_NODE,
    title: str.dashboard.title,
    iconData: mdiGauge,
    href: "/",
  },
  {
    type: SidebarItemTypes.LEAF_NODE,
    title: str.analytics.title,
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
        title: str.team.dev.title,
        iconData: mdiAlien,
        href: "",
      },
      {
        type: SidebarItemTypes.LEAF_NODE,
        title: str.team.qa.title,
        iconData: mdiTestTube,
        href: "",
      },
    ],
  },
  {
    type: SidebarItemTypes.GROUP,
    title: str.documents.title,
    items: [
      {
        type: SidebarItemTypes.LEAF_NODE,
        title: str.documents.dataLib.title,
        iconData: mdiDatabase,
        href: "",
      },
      {
        type: SidebarItemTypes.LEAF_NODE,
        title: str.documents.reports.title,
        iconData: mdiFileChart,
        href: "",
      },
    ],
  },
] as const satisfies SidebarItem[];
