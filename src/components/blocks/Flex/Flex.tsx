import type {
  PolymorphicProps,
  PropValueWithBreakpoints,
  WithBaseProps,
} from "@/types";
import { cn } from "@/utils/cn";
import { generateTailwindClassesWithBreakpoints } from "@/utils/generate-tailwind-classes-with-breakpoints";
import * as React from "react";
import classes from "./styles.module.css";

export type FlexProps<E extends React.ElementType = "div"> = PolymorphicProps<
  E,
  WithBaseProps<{
    /**
     * The variant of the flex-box.
     *
     * @default "block"
     */
    variant?: "block" | "inline";

    /**
     * Changes how flex-items wrap in the flex-box.
     */
    wrapMode?: PropValueWithBreakpoints<"nowrap" | "wrap" | "wrap-reverse">;

    /**
     * Sets the gap between flex-items in the flex-box.
     */
    gap?: PropValueWithBreakpoints<
      "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
    >;

    /**
     * Sets the direction of flex-items in the flex-box.
     */
    direction?: PropValueWithBreakpoints<
      "row" | "column" | "row-reverse" | "column-reverse"
    >;

    /**
     * Defines how the browser distributes space between and around content items
     * along the main-axis of the flex-box.
     */
    justifyContent?: PropValueWithBreakpoints<
      "start" | "end" | "center" | "between" | "around" | "evenly"
    >;

    /**
     * Controls the alignment of flex-items on the cross-axis in the flex-box.
     */
    alignItems?: PropValueWithBreakpoints<
      "start" | "end" | "center" | "baseline" | "stretch"
    >;

    /**
     * Sets the distribution of space between and around content items
     * along the cross-axis of the flex-box.
     *
     * (Note: This property has no effect on single rows of flex-items.)
     */
    alignContent?: PropValueWithBreakpoints<
      "start" | "end" | "center" | "between" | "around" | "evenly" | "stretch"
    >;
  }>
>;

export const Flex = <E extends React.ElementType = "div">(
  props: FlexProps<E>,
) => {
  const {
    as: Root = "div",
    className,
    children,
    wrapMode,
    gap,
    direction,
    justifyContent,
    alignItems,
    alignContent,
    variant = "block",
    ...otherProps
  } = props;

  /**
   * GENERATED CLASSES:
   * - "content-start", "content-end", "content-center", "content-stretch", "content-between", "content-around", "content-evenly"
   * - "xs:content-start", "xs:content-end", "xs:content-center", "xs:content-stretch", "xs:content-between", "xs:content-around", "xs:content-evenly"
   * - "sm:content-start", "sm:content-end", "sm:content-center", "sm:content-stretch", "sm:content-between", "sm:content-around", "sm:content-evenly"
   * - "md:content-start", "md:content-end", "md:content-center", "md:content-stretch", "md:content-between", "md:content-around", "md:content-evenly"
   * - "lg:content-start", "lg:content-end", "lg:content-center", "lg:content-stretch", "lg:content-between", "lg:content-around", "lg:content-evenly"
   * - "xl:content-start", "xl:content-end", "xl:content-center", "xl:content-stretch", "xl:content-between", "xl:content-around", "xl:content-evenly"
   */
  const alignContentClasses = generateTailwindClassesWithBreakpoints(
    "content",
    alignContent,
  );

  /**
   * GENERATED CLASSES:
   * - "items-start", "items-end", "items-center", "items-stretch", "items-baseline"
   * - "xs:items-start", "xs:items-end", "xs:items-center", "xs:items-stretch", "xs:items-baseline"
   * - "sm:items-start", "sm:items-end", "sm:items-center", "sm:items-stretch", "sm:items-baseline"
   * - "md:items-start", "md:items-end", "md:items-center", "md:items-stretch", "md:items-baseline"
   * - "lg:items-start", "lg:items-end", "lg:items-center", "lg:items-stretch", "lg:items-baseline"
   * - "xl:items-start", "xl:items-end", "xl:items-center", "xl:items-stretch", "xl:items-baseline"
   */
  const alignItemsClasses = generateTailwindClassesWithBreakpoints(
    "items",
    alignItems,
  );

  /**
   * GENERATED CLASSES:
   * - "justify-start", "justify-end", "justify-center", "justify-between", "justify-around", "justify-evenly"
   * - "xs:justify-start", "xs:justify-end", "xs:justify-center", "xs:justify-between", "xs:justify-around", "xs:justify-evenly"
   * - "sm:justify-start", "sm:justify-end", "sm:justify-center", "sm:justify-between", "sm:justify-around", "sm:justify-evenly"
   * - "md:justify-start", "md:justify-end", "md:justify-center", "md:justify-between", "md:justify-around", "md:justify-evenly"
   * - "lg:justify-start", "lg:justify-end", "lg:justify-center", "lg:justify-between", "lg:justify-around", "lg:justify-evenly"
   * - "xl:justify-start", "xl:justify-end", "xl:justify-center", "xl:justify-between", "xl:justify-around", "xl:justify-evenly"
   */
  const justifyContentClasses = generateTailwindClassesWithBreakpoints(
    "justify",
    justifyContent,
  );

  /**
   * GENERATED CLASSES:
   * - "nowrap", "wrap", "wrap-reverse"
   * - "xs:nowrap", "xs:wrap", "xs:wrap-reverse"
   * - "sm:nowrap", "sm:wrap", "sm:wrap-reverse"
   * - "md:nowrap", "md:wrap", "md:wrap-reverse"
   * - "lg:nowrap", "lg:wrap", "lg:wrap-reverse"
   * - "xl:nowrap", "xl:wrap", "xl:wrap-reverse"
   */
  const wrapModeClasses = generateTailwindClassesWithBreakpoints(
    "flex",
    wrapMode,
  );

  /**
   * GENERATED CLASSES:
   * - "gap-xxs", "gap-xs", "gap-sm", "gap-md", "gap-lg", "gap-xl", "gap-xxl"
   * - "xs:gap-xxs", "xs:gap-xs", "xs:gap-sm", "xs:gap-md", "xs:gap-lg", "xs:gap-xl", "xs:gap-xxl"
   * - "sm:gap-xxs", "sm:gap-xs", "sm:gap-sm", "sm:gap-md", "sm:gap-lg", "sm:gap-xl", "sm:gap-xxl"
   * - "md:gap-xxs", "md:gap-xs", "md:gap-sm", "md:gap-md", "md:gap-lg", "md:gap-xl", "md:gap-xxl"
   * - "lg:gap-xxs", "lg:gap-xs", "lg:gap-sm", "lg:gap-md", "lg:gap-lg", "lg:gap-xl", "lg:gap-xxl"
   * - "xl:gap-xxs", "xl:gap-xs", "xl:gap-sm", "xl:gap-md", "xl:gap-lg", "xl:gap-xl", "xl:gap-xxl"
   */
  const gapClasses = generateTailwindClassesWithBreakpoints("gap", gap);

  /**
   * GENERATED CLASSES:
   * - "flex-row", "flex-row-reverse", "flex-col", "flex-col-reverse"
   * - "xs:flex-row", "xs:flex-row-reverse", "xs:flex-col", "xs:flex-col-reverse"
   * - "sm:flex-row", "sm:flex-row-reverse", "sm:flex-col", "sm:flex-col-reverse"
   * - "md:flex-row", "md:flex-row-reverse", "md:flex-col", "md:flex-col-reverse"
   * - "lg:flex-row", "lg:flex-row-reverse", "lg:flex-col", "lg:flex-col-reverse"
   * - "xl:flex-row", "xl:flex-row-reverse", "xl:flex-col", "xl:flex-col-reverse"
   */
  const directionClasses = generateTailwindClassesWithBreakpoints(
    "flex",
    direction,
    v => {
      if (v === "column") return "col";
      if (v === "column-reverse") return "col-reverse";

      return v;
    },
  );

  return (
    <Root
      {...otherProps}
      className={cn(
        className,
        classes["root"],
        classes[variant],
        directionClasses,
        gapClasses,
        wrapModeClasses,
        justifyContentClasses,
        alignItemsClasses,
        alignContentClasses,
      )}
    >
      {children}
    </Root>
  );
};
