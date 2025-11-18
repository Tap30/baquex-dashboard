import { useId } from "react";

export const useUniqueId = (idOverride?: string | number): string => {
  const nodeId = useId();

  return typeof idOverride === "undefined" || !String(idOverride)
    ? nodeId.replace(/:/g, "").replace(/(«|»)/g, "")
    : String(idOverride);
};
