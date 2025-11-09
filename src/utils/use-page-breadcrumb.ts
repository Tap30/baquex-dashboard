import { useBreadcrumb, type BreadcrumbItem } from "@components/Breadcrumb";
import { useGetLatest } from "@utils/use-get-latest";
import { useEffect } from "react";

export const usePageBreadcrumb = (crumbs: BreadcrumbItem[]) => {
  const { addCrumb, removeCrumb } = useBreadcrumb();

  const getCrumbs = useGetLatest(crumbs);

  useEffect(() => {
    const crumbs = getCrumbs();

    crumbs.forEach(crumb => {
      addCrumb(crumb);
    });

    return () => {
      crumbs.forEach(crumb => {
        removeCrumb(crumb);
      });
    };
  }, [addCrumb, getCrumbs, removeCrumb]);
};
