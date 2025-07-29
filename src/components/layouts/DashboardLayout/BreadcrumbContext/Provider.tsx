import type { BreadcrumbItem } from "@/components";
import { useCallback, useMemo, useState } from "react";
import { BreadcrumbContext, type BreadcrumbContextValue } from "./Context.ts";

type Props = {
  children: React.ReactNode;
};

export const BreadcrumbProvider: React.FC<Props> = props => {
  const { children } = props;

  const [crumbs, setCrumbs] = useState<BreadcrumbItem[]>([]);

  const addCrumb = useCallback((crumb: BreadcrumbItem) => {
    setCrumbs(c => c.concat(crumb));
  }, []);

  const removeCrumb = useCallback((crumb: BreadcrumbItem) => {
    setCrumbs(c => c.filter(cr => cr !== crumb));
  }, []);

  const context = useMemo(
    () =>
      ({
        addCrumb,
        removeCrumb,
        crumbs,
      }) satisfies BreadcrumbContextValue,
    [addCrumb, crumbs, removeCrumb],
  );

  return (
    <BreadcrumbContext.Provider value={context}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
