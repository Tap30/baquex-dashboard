import { useContext } from "react";
import { AccessControlContext } from "./Context.ts";
import type { AccessControlContextValue } from "./types.ts";

export const useAccessControl = (): AccessControlContextValue => {
  const context = useContext(AccessControlContext);

  if (!context) {
    throw new Error(
      "useAccessControl must be used within AccessControlProvider.",
    );
  }

  return context;
};
