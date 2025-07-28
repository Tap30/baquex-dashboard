import { Icon, Text, type TextProps } from "@/components";
import { cn } from "@/utils";
import { mdiCheck } from "@mdi/js";
import * as SelectPrimitive from "@radix-ui/react-select";
import classes from "./styles.module.css";

export const SelectItem = ({
  className,
  size = "md",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & {
  size?: "sm" | "md" | "lg";
}) => {
  const descVariant = {
    lg: "body1",
    md: "body1",
    sm: "body2",
  }[size] as TextProps["variant"];

  return (
    <SelectPrimitive.Item
      className={cn(classes["root"], classes[size], className)}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className={cn(classes["item-indicator"])}>
        <Icon data={mdiCheck} />
      </SelectPrimitive.ItemIndicator>

      <SelectPrimitive.ItemText>
        <Text variant={descVariant}>{children}</Text>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};
