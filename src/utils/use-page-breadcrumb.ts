import { useBreadcrumb, type BreadcrumbItem } from "@components/Breadcrumb";
import { useEffect } from "react";
import { useGetLatest } from "./use-get-latest.ts";

export const usePageBreadcrumb = (crumb: BreadcrumbItem) => {
  const { addCrumb, removeCrumb } = useBreadcrumb();

  const getCrumb = useGetLatest(crumb);

  useEffect(() => {
    const crumb = getCrumb();

    addCrumb(crumb);

    return () => {
      removeCrumb(crumb);
    };
  }, [addCrumb, getCrumb, removeCrumb]);
};
