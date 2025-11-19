import { Item as DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { cn } from "@utils/cn";
import type { MenuNormalItem } from "../../types.ts";
import classes from "./styles.module.css";

export type NormalItemProps = Omit<MenuNormalItem, "type"> & {
  className?: string;
};

export const NormalItem: React.FC<NormalItemProps> = props => {
  const {
    className,
    label,
    disabled = false,
    icon,
    onSelect,
    shortcut,
    ...otherProps
  } = props;

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div
        aria-hidden
        className={classes["icon"]}
      >
        {icon}
      </div>
    );
  };

  const renderShortcut = () => {
    if (!shortcut) return null;

    return <span className={classes["shortcut"]}>{shortcut}</span>;
  };

  return (
    <DropdownMenuItem
      {...otherProps}
      disabled={disabled}
      onSelect={onSelect}
      textValue={label}
      className={cn(classes["root"], className)}
    >
      {renderIcon()}
      <span className={classes["label"]}>{label}</span>
      {renderShortcut()}
    </DropdownMenuItem>
  );
};
