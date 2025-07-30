export type ChartConfig = {
  [k in string]: {
    label: string;
    icon?: React.ReactNode;
  } & { color?: string };
};
