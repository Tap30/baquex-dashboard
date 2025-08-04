import { useContext } from "react";
import { ChartContext, type ChartContextValue } from "./ChartContext.ts";

export const useChart = (): ChartContextValue => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
};
