import { cn } from "@utils/cn";
import * as RechartsPrimitive from "recharts";
import { useChart } from "../../context/index.internal.ts";
import { getPayloadConfigFromPayload } from "../../utils.ts";
import classes from "./styles.module.css";

export type ChartLegendContentProps = {
  /**
   * The className applied to the component.
   */
  className?: string;

  /**
   * The config or data key to use for the name.
   */
  nameKey?: string;

  payload?: React.ComponentProps<
    typeof RechartsPrimitive.DefaultTooltipContent
  >["payload"];
};

export const ChartLegendContent: React.FC<ChartLegendContentProps> = props => {
  const { payload, nameKey, className } = props;

  const { config } = useChart();

  if (!payload?.length) return null;

  const renderItems = () => {
    return payload.map(item => {
      const key = String(nameKey || item.dataKey || "value");
      const { label, color } =
        getPayloadConfigFromPayload(config, item, key) ?? {};

      if (!label) return null;

      return (
        <div
          key={String(item.value ?? key)}
          className={classes["item"]}
        >
          <div
            className={classes["indicator"]}
            style={
              {
                "--legend-item-indicator-background": color,
              } as React.CSSProperties
            }
          />
          <span className={classes["label"]}>{label}</span>
        </div>
      );
    });
  };

  return (
    <div className={cn(classes["root"], className)}>
      <div className={classes["items"]}>{renderItems()}</div>
    </div>
  );
};

export const ChartLegend = RechartsPrimitive.Legend;
