import { createContext } from "react";
import type { SelectControlRenderProps } from "./SelectControl.tsx";

export const SelectControlContext =
  createContext<SelectControlRenderProps | null>(null);
