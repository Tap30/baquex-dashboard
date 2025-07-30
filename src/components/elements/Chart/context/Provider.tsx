import { ChartContext, type ChartContextValue } from "./ChartContext.ts";

export type ChartProviderProps = {
  children: React.ReactNode;
  config: ChartContextValue["config"];
};

export const ChartProvider: React.FC<ChartProviderProps> = props => {
  const { children, config } = props;

  return (
    <ChartContext.Provider value={{ config }}>{children}</ChartContext.Provider>
  );
};
