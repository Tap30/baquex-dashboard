import * as ProgressPrimitives from "@radix-ui/react-progress";
import type { WithRef } from "@types";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type ProgressProps = Pick<
  ProgressPrimitives.ProgressProps,
  "value" | "getValueLabel" | "max"
> &
  WithRef<
    {
      /**
       * The className applied to the component.
       */
      className?: string;
    },
    "div"
  >;

export const Progress: React.FC<ProgressProps> = props => {
  const { className, ref, getValueLabel, max, value } = props;

  const indicatorStyles: React.CSSProperties = {
    width: typeof value === "number" ? `${value}%` : undefined,
  };

  return (
    <ProgressPrimitives.Root
      ref={ref}
      className={cn(classes["root"], className)}
      max={max}
      value={value}
      getValueLabel={getValueLabel}
    >
      <ProgressPrimitives.Indicator
        className={classes["indicator"]}
        style={{ ...indicatorStyles }}
      />
    </ProgressPrimitives.Root>
  );
};
