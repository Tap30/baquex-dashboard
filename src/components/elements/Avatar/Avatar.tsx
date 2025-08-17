import * as AvatarPrimitives from "@radix-ui/react-avatar";
import type { WithRef } from "@types";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type AvatarProps = WithRef<
  {
    /**
     * The className applied to the component.
     */
    className?: string;

    /**
     * The image URL.
     */
    src: string;

    /**
     * The size of the component.
     *
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Provides fallback (alternate) text to display when the image is not loaded.
     */
    alt: string;

    /**
     * An element that renders when the image hasn't loaded.
     */
    fallback?: React.ReactNode;
  },
  "span"
>;

export const Avatar: React.FC<AvatarProps> = props => {
  const { alt, src, className, fallback, size = "md", ref } = props;

  return (
    <AvatarPrimitives.Root
      ref={ref}
      className={cn(classes["root"], classes[size], className)}
    >
      <AvatarPrimitives.Image
        className={classes["image"]}
        src={src}
        alt={alt}
      />
      <AvatarPrimitives.Fallback className={classes["fallback"]}>
        {fallback}
      </AvatarPrimitives.Fallback>
    </AvatarPrimitives.Root>
  );
};
