import type { MergeElementProps } from "@types";
import { cn } from "@utils/cn";
import { useUniqueId } from "@utils/use-unique-id";
import * as RechartsPrimitive from "recharts";
import { ChartProvider } from "../../context/index.ts";
import type { ChartConfig } from "../../types.ts";
import classes from "./styles.module.css";

export type ChartContainerProps = MergeElementProps<
  "div",
  {
    /**
     * The configuration for the chart.
     */
    config: ChartConfig;

    /**
     * The chart component instance.
     */
    children: React.JSX.Element;

    /**
     * The recharts' responsive container props.
     */
    responsiveProps?: Omit<
      RechartsPrimitive.ResponsiveContainerProps,
      "children" | "className" | "style" | "id"
    >;
  }
>;

export const ChartContainer: React.FC<ChartContainerProps> = props => {
  const {
    config,
    children,
    className,
    id: idProp,
    responsiveProps,
    ...otherProps
  } = props;

  const chartId = useUniqueId(idProp);

  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.color,
  );

  const renderStyle = () => {
    if (colorConfig.length === 0) return null;

    const getCssStyle = (): string | TrustedHTML => {
      const cssVariables = colorConfig
        .map(([key, itemConfig]) => {
          const { color } = itemConfig;

          return color ? `--chart-color-${key}: ${color};` : null;
        })
        .filter(v => v !== null)
        .join("");

      return [`[data-chart="${chartId}"] {${cssVariables}}`].join("");
    };

    return (
      <style
        dangerouslySetInnerHTML={{
          __html: getCssStyle(),
        }}
      />
    );
  };

  return (
    <ChartProvider config={config}>
      <div
        {...otherProps}
        data-chart={chartId}
        className={cn(classes["root"], className)}
      >
        {renderStyle()}
        <RechartsPrimitive.ResponsiveContainer {...responsiveProps}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartProvider>
  );
};
