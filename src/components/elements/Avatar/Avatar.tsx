import { cn } from "@/utils";
import * as AvatarPrimitives from "@radix-ui/react-avatar";
import classes from "./styles.module.css";

export type AvatarProps = {
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
};

export const Avatar: React.FC<AvatarProps> = props => {
  const { alt, src, className, fallback, size = "md" } = props;

  return (
    <AvatarPrimitives.Root
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
