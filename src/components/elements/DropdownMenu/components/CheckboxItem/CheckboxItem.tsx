import { Icon } from "@components/Icon";
import { mdiCheckBold } from "@mdi/js";
import {
  CheckboxItem as DropdownMenuCheckboxItem,
  ItemIndicator,
} from "@radix-ui/react-dropdown-menu";
import { cn } from "@utils/cn";
import type { MenuCheckboxItem } from "../../types.ts";
import classes from "./styles.module.css";

export type CheckboxItemProps = Omit<MenuCheckboxItem, "type"> & {
  className?: string;
};

export const CheckboxItem: React.FC<CheckboxItemProps> = props => {
  const {
    className,
    label,
    disabled = false,
    checked,
    onCheckedChange,
    onSelect,
    shortcut,
  } = props;

  const renderShortcut = () => {
    if (!shortcut) return null;

    return <span className={classes["shortcut"]}>{shortcut}</span>;
  };

  return (
    <DropdownMenuCheckboxItem
      disabled={disabled}
      onSelect={onSelect}
      textValue={label}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(classes["root"], className)}
    >
      <ItemIndicator className={classes["indicator"]}>
        <div
          aria-hidden
          className={classes["icon"]}
        >
          <Icon data={mdiCheckBold} />
        </div>
      </ItemIndicator>
      <span className={classes["label"]}>{label}</span>
      {renderShortcut()}
    </DropdownMenuCheckboxItem>
  );
};
