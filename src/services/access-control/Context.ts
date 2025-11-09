import { createContext } from "react";
import type { AccessControlContextValue } from "./types.ts";

export const AccessControlContext =
  createContext<AccessControlContextValue | null>(null);
