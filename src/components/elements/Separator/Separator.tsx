import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type SeparatorProps = SeparatorPrimitive.SeparatorProps;

export const Separator: React.FC<SeparatorProps> = props => {
  const {
    className,
    decorative,
    style,
    orientation = "horizontal",
    ...otherProps
  } = props;

  return (
    <SeparatorPrimitive.Root
      {...otherProps}
      style={style}
      decorative={decorative}
      orientation={orientation}
      className={cn(classes["root"], className, classes[orientation])}
    />
  );
};
