import type { MergeElementProps } from "@types";
import { cn } from "@utils/cn";
import * as RechartsPrimitive from "recharts";
import { useChart } from "../../context/index.internal.ts";
import { getPayloadConfigFromPayload } from "../../utils.ts";
import { TooltipItem } from "./Item.tsx";
import classes from "./styles.module.css";

export type ChartTooltipContentProps = Omit<
  MergeElementProps<
    "div",
    React.ComponentProps<typeof RechartsPrimitive.Tooltip> & {
      /**
       * The config or data key to use for the name.
       */
      nameKey?: string;

      payload?: React.ComponentProps<
        typeof RechartsPrimitive.DefaultTooltipContent
      >["payload"];
    }
  >,
  "children"
>;

export const ChartTooltipContent: React.FC<
  ChartTooltipContentProps
> = props => {
  const { className, nameKey, active, payload, formatter, color } = props;

  const { config } = useChart();

  if (!active || !payload?.length) return null;

  const renderItems = () => {
    return payload.map((item, idx) => {
      const key = String(nameKey || item.name || item.dataKey || "value");
      const itemConfig = getPayloadConfigFromPayload(config, item, key);

      const indicatorColor =
        color ||
        item.color ||
        (item.payload as object & { fill?: string })?.fill;

      return (
        <TooltipItem
          item={item}
          icon={itemConfig?.icon}
          key={String(item.dataKey ?? idx)}
          itemLabel={itemConfig?.label}
          indicatorColor={indicatorColor}
          formatter={formatter}
          itemIdx={idx}
          className={classes["item"]}
        />
      );
    });
  };

  return (
    <div className={cn(classes["root"], className)}>
      <div className={classes["items"]}>{renderItems()}</div>
    </div>
  );
};

export const ChartTooltip = RechartsPrimitive.Tooltip;
