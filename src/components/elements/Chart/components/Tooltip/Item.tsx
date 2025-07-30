import type { ExcludeUndefined } from "@/types";
import { formatNumber } from "@/utils";
import type { DefaultTooltipContent } from "recharts";
import classes from "./styles.module.css";

type Props = {
  className?: string;
  itemIdx: number;
  icon?: React.ReactNode;
  indicatorColor?: string;
  itemLabel?: string;
  item: ExcludeUndefined<
    React.ComponentProps<typeof DefaultTooltipContent>["payload"]
  >[number];
  formatter?: React.ComponentProps<typeof DefaultTooltipContent>["formatter"];
};

export const TooltipItem: React.FC<Props> = props => {
  const {
    className,
    item,
    formatter,
    icon,
    itemIdx,
    indicatorColor,
    itemLabel,
  } = props;

  const format = () => {
    if (formatter && item?.value !== undefined && item.name) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return formatter(item.value, item.name, item, itemIdx, item.payload);
    }

    return null;
  };

  const renderRow = () => {
    let indicator: React.ReactNode = null;

    if (icon) {
      indicator = (
        <div
          aria-hidden
          className={classes["icon"]}
        >
          {icon}
        </div>
      );
    } else {
      indicator = (
        <div
          className={classes["indicator"]}
          style={
            {
              "--tooltip-item-indicator-background": indicatorColor,
              "--tooltip-item-indicator-border-color": indicatorColor,
            } as React.CSSProperties
          }
        />
      );
    }

    return (
      <div className={classes["content"]}>
        {indicator}
        <span className={classes["label"]}>{itemLabel || item.name}</span>
        {item.value && (
          <strong className={classes["value"]}>
            {formatNumber(Number(item.value.toLocaleString()))}
          </strong>
        )}
      </div>
    );
  };

  return <div className={className}>{format() ?? renderRow()}</div>;
};
