import type { ExcludeUndefined } from "@types";
import { formatNumber } from "@utils/numbers";
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

    const renderValue = () => {
      if (typeof item.value === "undefined") return null;

      let value: React.ReactNode;
      const userFormattedValue = format();

      if (userFormattedValue) {
        value = userFormattedValue;
      } else {
        if (typeof item.value === "number") {
          value = formatNumber(Number(item.value), {
            useGrouping: true,
          });
        } else if (typeof item.value === "string") {
          value = item.value;
        } else {
          value = item.value
            .map(v =>
              typeof v === "number"
                ? formatNumber(Number(v), {
                    useGrouping: true,
                  })
                : v,
            )
            .join(", ");
        }
      }

      return <strong className={classes["value"]}>{value}</strong>;
    };

    return (
      <div className={classes["content"]}>
        {indicator}
        <span className={classes["label"]}>{itemLabel || item.name}</span>
        {renderValue()}
      </div>
    );
  };

  return <div className={className}>{renderRow()}</div>;
};
