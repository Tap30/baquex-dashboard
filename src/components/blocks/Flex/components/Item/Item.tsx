import type {
  MergeElementProps,
  PropValueWithBreakpoints,
  WithBaseProps,
} from "@/types";
import { cn } from "@/utils/cn";
import { generateTailwindClassesWithBreakpoints } from "@/utils/generate-tailwind-classes-with-breakpoints";
import * as React from "react";
import classes from "./styles.module.css";

export type FlexItemProps = MergeElementProps<
  "div",
  WithBaseProps<{
    /**
     * Sets the initial main size of the flex-item.
     * It sets the size of the content box unless otherwise set with `box-sizing`.
     */
    basis?: PropValueWithBreakpoints<"zero" | "auto" | "full">;

    /**
     * Sets the flex grow factor,
     * which specifies how much of the flex-container's remaining space
     * should be assigned to the flex-item's main size.
     */
    grow?: PropValueWithBreakpoints<0 | 1 | 2 | 3>;

    /**
     * Sets the flex shrink factor of the flex-item.
     * If the size of all flex-items is larger than the flex-container,
     * items shrink to fit according to this property.
     */
    shrink?: PropValueWithBreakpoints<0 | 1 | 2 | 3>;

    /**
     * Overrides the flex-item's `align-items` value.
     * It aligns the item on the cross-axis.
     */
    alignSelf?: PropValueWithBreakpoints<
      "auto" | "start" | "end" | "center" | "baseline" | "stretch"
    >;

    /**
     * Sets the logical block start margin of the item to `auto`.
     * This maps to a physical margin depending on the item's
     * writing mode, directionality, and text orientation.
     */
    autoMarginBlockStart?: PropValueWithBreakpoints<boolean>;

    /**
     * Sets the logical block end margin of the item to `auto`.
     * This maps to a physical margin depending on the item's
     * writing mode, directionality, and text orientation.
     */
    autoMarginBlockEnd?: PropValueWithBreakpoints<boolean>;

    /**
     * Sets the logical inline start margin of the item to `auto`.
     * This maps to a physical margin depending on the item's
     * writing mode, directionality, and text orientation.
     */
    autoMarginInlineStart?: PropValueWithBreakpoints<boolean>;

    /**
     * Sets the logical inline end margin of the item to `auto`.
     * This maps to a physical margin depending on the item's
     * writing mode, directionality, and text orientation.
     */
    autoMarginInlineEnd?: PropValueWithBreakpoints<boolean>;
  }>
>;

export const FlexItem: React.FC<FlexItemProps> = props => {
  const {
    className,
    children,
    basis,
    grow,
    shrink,
    alignSelf,
    autoMarginBlockStart,
    autoMarginBlockEnd,
    autoMarginInlineStart,
    autoMarginInlineEnd,
    ...otherProps
  } = props;

  /**
   * GENERATED CLASSES:
   * - "basis-0", "basis-full", "basis-auto"
   * - "xs:basis-0", "xs:basis-full", "xs:basis-auto"
   * - "sm:basis-0", "sm:basis-full", "sm:basis-auto"
   * - "md:basis-0", "md:basis-full", "md:basis-auto"
   * - "lg:basis-0", "lg:basis-full", "lg:basis-auto"
   * - "xl:basis-0", "xl:basis-full", "xl:basis-auto"
   */
  const basisClasses = generateTailwindClassesWithBreakpoints(
    "basis",
    basis,
    v => {
      if (v === "zero") return String(0);

      return v;
    },
  );

  /**
   * GENERATED CLASSES:
   * - "grow-0", "grow-1", "grow-2", "grow-3"
   * - "xs:grow-0", "xs:grow-1", "xs:grow-2", "xs:grow-3"
   * - "sm:grow-0", "sm:grow-1", "sm:grow-2", "sm:grow-3"
   * - "md:grow-0", "md:grow-1", "md:grow-2", "md:grow-3"
   * - "lg:grow-0", "lg:grow-1", "lg:grow-2", "lg:grow-3"
   * - "xl:grow-0", "xl:grow-1", "xl:grow-2", "xl:grow-3"
   */
  const growClasses = generateTailwindClassesWithBreakpoints("grow", grow, v =>
    typeof v === "undefined" ? undefined : String(v),
  );

  /**
   * GENERATED CLASSES:
   * - "shrink-0", "shrink-1", "shrink-2", "shrink-3"
   * - "xs:shrink-0", "xs:shrink-1", "xs:shrink-2", "xs:shrink-3"
   * - "sm:shrink-0", "sm:shrink-1", "sm:shrink-2", "sm:shrink-3"
   * - "md:shrink-0", "md:shrink-1", "md:shrink-2", "md:shrink-3"
   * - "lg:shrink-0", "lg:shrink-1", "lg:shrink-2", "lg:shrink-3"
   * - "xl:shrink-0", "xl:shrink-1", "xl:shrink-2", "xl:shrink-3"
   */
  const shrinkClasses = generateTailwindClassesWithBreakpoints(
    "shrink",
    shrink,
    v => (typeof v === "undefined" ? undefined : String(v)),
  );

  /**
   * GENERATED CLASSES:
   * - "self-start", "self-end", "self-auto", "self-center", "self-baseline", "self-stretch"
   * - "xs:self-start", "xs:self-end", "xs:self-auto", "xs:self-center", "xs:self-baseline", "xs:self-stretch"
   * - "sm:self-start", "sm:self-end", "sm:self-auto", "sm:self-center", "sm:self-baseline", "sm:self-stretch"
   * - "md:self-start", "md:self-end", "md:self-auto", "md:self-center", "md:self-baseline", "md:self-stretch"
   * - "lg:self-start", "lg:self-end", "lg:self-auto", "lg:self-center", "lg:self-baseline", "lg:self-stretch"
   * - "xl:self-start", "xl:self-end", "xl:self-auto", "xl:self-center", "xl:self-baseline", "xl:self-stretch"
   */
  const alignSelfClasses = generateTailwindClassesWithBreakpoints(
    "self",
    alignSelf,
  );

  /**
   * GENERATED CLASSES:
   * - "ms-auto"
   * - "xs:ms-auto"
   * - "sm:ms-auto"
   * - "md:ms-auto"
   * - "lg:ms-auto"
   * - "xl:ms-auto"
   */
  const autoMarginInlineStartClasses = generateTailwindClassesWithBreakpoints(
    "ms",
    autoMarginInlineStart,
    v => (v ? "auto" : undefined),
  );

  /**
   * GENERATED CLASSES:
   * - "me-auto"
   * - "xs:me-auto"
   * - "sm:me-auto"
   * - "md:me-auto"
   * - "lg:me-auto"
   * - "xl:me-auto"
   */
  const autoMarginInlineEndClasses = generateTailwindClassesWithBreakpoints(
    "me",
    autoMarginInlineEnd,
    v => (v ? "auto" : undefined),
  );

  /**
   * GENERATED CLASSES:
   * - "mt-auto"
   * - "xs:mt-auto"
   * - "sm:mt-auto"
   * - "md:mt-auto"
   * - "lg:mt-auto"
   * - "xl:mt-auto"
   */
  const autoMarginBlockStartClasses = generateTailwindClassesWithBreakpoints(
    "mt",
    autoMarginBlockStart,
    v => (v ? "auto" : undefined),
  );

  /**
   * GENERATED CLASSES:
   * - "mb-auto"
   * - "xs:mb-auto"
   * - "sm:mb-auto"
   * - "md:mb-auto"
   * - "lg:mb-auto"
   * - "xl:mb-auto"
   */
  const autoMarginBlockEndClasses = generateTailwindClassesWithBreakpoints(
    "mb",
    autoMarginBlockEnd,
    v => (v ? "auto" : undefined),
  );

  return (
    <div
      {...otherProps}
      className={cn(
        className,
        classes["root"],
        basisClasses,
        growClasses,
        shrinkClasses,
        alignSelfClasses,
        autoMarginInlineStartClasses,
        autoMarginInlineEndClasses,
        autoMarginBlockStartClasses,
        autoMarginBlockEndClasses,
      )}
    >
      {children}
    </div>
  );
};
