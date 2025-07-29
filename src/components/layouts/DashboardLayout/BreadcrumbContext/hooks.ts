import { useContext } from "react";
import { BreadcrumbContext } from "./Context.ts";

export const useBreadcrumb = () => {
  const ctx = useContext(BreadcrumbContext);

  if (!ctx) {
    throw new Error("useBreadcrumb must be used within an BreadcrumbProvider.");
  }

  return ctx;
};
