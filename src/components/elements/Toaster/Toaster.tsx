import type { WithRef } from "@/types";
import { cn } from "@/utils";
import { Toaster as Sonner, type ToasterProps as SonnerProps } from "sonner";
import classes from "./styles.module.css";

export type ToasterProps = WithRef<Omit<SonnerProps, "theme">, "div">;

export const Toaster: React.FC<ToasterProps> = props => {
  const { ref, className, ...otherProps } = props;

  return (
    <Sonner
      {...otherProps}
      ref={ref}
      className={cn(classes["root"], className)}
    />
  );
};
