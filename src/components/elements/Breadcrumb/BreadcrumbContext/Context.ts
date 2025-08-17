import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { createContext } from "react";

export type BreadcrumbContextValue = {
  addCrumb: (crumb: BreadcrumbItem) => void;
  removeCrumb: (crumb: BreadcrumbItem) => void;
  crumbs: BreadcrumbItem[];
};

export const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(
  null,
);
