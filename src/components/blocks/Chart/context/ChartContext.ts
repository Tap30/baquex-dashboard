import { createContext } from "react";
import type { ChartConfig } from "../types.ts";

export type ChartContextValue = {
  config: ChartConfig;
};

export const ChartContext = createContext<ChartContextValue | null>(null);
