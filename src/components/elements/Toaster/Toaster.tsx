import { useDirection } from "@/contexts";
import type { WithRef } from "@/types";
import { Toaster as Sonner, type ToasterProps as SonnerProps } from "sonner";

export type ToasterProps = WithRef<
  Omit<SonnerProps, "theme" | "className">,
  "div"
>;

export const Toaster: React.FC<ToasterProps> = props => {
  const { ref, ...otherProps } = props;

  const direction = useDirection();

  return (
    <Sonner
      {...otherProps}
      ref={ref}
      theme="dark"
      expand
      dir={direction}
      duration={Infinity}
      position="bottom-center"
    />
  );
};
