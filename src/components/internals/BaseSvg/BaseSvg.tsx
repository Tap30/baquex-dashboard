import type { MergeElementProps, WithBaseProps } from "@types";
import { cn } from "@utils/cn";
import type { WithColorProps } from "../../types.ts";
import classes from "./styles.module.css";

export type BaseSvgProps = MergeElementProps<
  "svg",
  WithBaseProps<
    WithColorProps<{
      /**
       * The viewBox of the SVG.
       *
       * Allows you to redefine what the coordinates without units mean inside an SVG element.
       *
       * @default "0 0 24 24"
       */
      viewBox?: string;

      /**
       * Provides a human-readable title for the element that contains it.
       * https://www.w3.org/TR/SVG-access/#Equivalent
       */
      title?: string;

      /**
       * The size of the icon.
       * If set to `"auto"`, the icon will get the parent's width and height.
       *
       * @default "auto"
       */
      size?: number | "auto";
    }>
  >
>;

export const BaseSvg: React.FC<BaseSvgProps> = props => {
  const {
    ref,
    children,
    className,
    title,
    style: otherStyles,
    color = "currentcolor",
    viewBox = "0 0 24 24",
    size = "auto",
    ...otherProps
  } = props;

  const hasValidSize =
    (typeof size === "number" && !isNaN(size)) ||
    (typeof size === "string" && size === "auto");

  if (!hasValidSize) {
    // eslint-disable-next-line no-console
    console.error(`Expected a valid size prop, received \`size={${size}}\`.`);
  }

  const sizeStyles: React.CSSProperties =
    size === "auto"
      ? {
          width: "100%",
          height: "100%",
        }
      : typeof size === "number"
        ? {
            width: `${size / 16}rem`,
            height: `${size / 16}rem`,
            minWidth: `${size / 16}rem`,
            minHeight: `${size / 16}rem`,
          }
        : {
            width: "1rem",
            height: "1rem",
            minWidth: "1rem",
            minHeight: "1rem",
          };

  return (
    <svg
      {...otherProps}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      style={{ ...otherStyles, ...sizeStyles }}
      className={cn(classes["root"], classes[color], className)}
      ref={ref}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};
