import type { PolymorphicProps, WithBaseProps } from "@/types";
import { cn } from "@/utils";
import type { WithColorProps } from "../../types.ts";
import classes from "./Text.module.css";

export type TextProps<E extends React.ElementType = "span"> = PolymorphicProps<
  E,
  WithBaseProps<
    WithColorProps<{
      /**
       * Applies the theme typography styles.
       */
      variant:
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "subheading1"
        | "subheading2"
        | "body1"
        | "body2"
        | "caption";

      /**
       * Set the text-align on the text.
       */
      align?: "left" | "center" | "right" | "justify" | "start" | "end";

      /**
       * Set the font-weight on the text.
       */
      weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

      /**
       * Set the display on the text.
       */
      display?: "inline" | "block" | "inline-block";

      /**
       * Set the text-overflow on the text.
       *
       * @default "ellipsis"
       */
      textOverflow?: "clip" | "ellipsis";

      /**
       * If `true`, the text will not wrap,
       * but instead will truncate or clip based on the `textOverflow` prop provided.
       *
       * Note that text overflow can only happen
       * when the element has a width in order to overflow.
       * ('block', 'inline-block')
       *
       * @default false
       */
      noWrap?: boolean;
    }>
  >
>;

export const Text = <E extends React.ElementType = "span">(
  props: TextProps<E>,
) => {
  const {
    children,
    className,
    variant,
    align,
    display,
    weight,
    as: Root = "span",
    color = "currentcolor",
    noWrap = false,
    textOverflow = "ellipsis",
    ...otherProps
  } = props as TextProps<"span">;

  return (
    <Root
      {...otherProps}
      className={cn(
        className,
        classes["root"],
        classes[variant],
        classes[color],
        classes[textOverflow],
        {
          [classes["no-wrap"]!]: noWrap,
          [classes[align!]!]: !!align,
          [classes[`weight-${weight!}`]!]: !!weight,
          [classes[display!]!]: !!display,
        },
      )}
    >
      {children}
    </Root>
  );
};
