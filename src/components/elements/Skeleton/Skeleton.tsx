import type { WithRef } from "@types";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type SkeletonProps = WithRef<
  {
    /**
     * The className applied to the component.
     */
    className?: string;

    /**
     * Optional children to infer width and height from.
     */
    children?: React.ReactNode;

    /**
     * The ratio of the width to the height.
     *
     * Only works when `variant="rectangular"`.
     */
    ratio?: number;

    /**
     * Width of the skeleton.
     * Useful when the skeleton is inside an inline element with no width of its own.
     */
    width?: React.CSSProperties["width"];

    /**
     * Height of the skeleton.
     * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
     */
    height?: React.CSSProperties["height"];

    /**
     * The type of content that will be rendered.
     */
    variant: "circular" | "rectangular" | "text";
  },
  "div"
>;

export const Skeleton: React.FC<SkeletonProps> = props => {
  const { ref, className, children, ratio, width, height, variant } = props;

  const style: React.CSSProperties = {
    width,
    height,
  };

  if (ratio && variant === "rectangular") {
    style.height = 0;
    style.paddingTop = `${100 / ratio}%`;
  } else if (ratio && variant !== "rectangular") {
    // eslint-disable-next-line no-console
    console.error(
      'Skeleton: You can only use `ratio` when `variant="rectangular"`.',
    );
  }

  return (
    <div
      ref={ref}
      style={style}
      aria-hidden
      className={cn(className, classes["root"], classes[variant], {
        [classes["has-children"]!]: !!children,
        [classes["auto-width"]!]: !!children && !width,
        [classes["auto-height"]!]: !!children && !height,
      })}
    >
      {children}
    </div>
  );
};
