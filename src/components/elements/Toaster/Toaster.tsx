import type { WithRef } from "@/types";
import { Toaster as Sonner, type ToasterProps as SonnerProps } from "sonner";

export type ToasterProps = WithRef<
  Omit<SonnerProps, "theme" | "className">,
  "div"
>;

export const Toaster: React.FC<ToasterProps> = props => {
  const { ref, ...otherProps } = props;

  return (
    <Sonner
      {...otherProps}
      ref={ref}
      theme="dark"
      expand
    />
  );
};
