import { Icon } from "@components/Icon";
import { mdiCircleMedium } from "@mdi/js";
import {
  RadioItem as DropdownMenuRadioItem,
  ItemIndicator,
} from "@radix-ui/react-dropdown-menu";
import { cn } from "@utils/cn";
import type { MenuRadioGroup } from "../../types.ts";
import classes from "./styles.module.css";

export type RadioItemProps = MenuRadioGroup["radios"][number] & {
  className?: string;
};

export const RadioItem: React.FC<RadioItemProps> = props => {
  const {
    className,
    label,
    disabled = false,
    value,
    onSelect,
    shortcut,
  } = props;

  const renderShortcut = () => {
    if (!shortcut) return null;

    return <span className={classes["shortcut"]}>{shortcut}</span>;
  };

  return (
    <DropdownMenuRadioItem
      disabled={disabled}
      onSelect={onSelect}
      textValue={label}
      value={value}
      className={cn(classes["root"], className)}
    >
      <ItemIndicator className={classes["indicator"]}>
        <div
          aria-hidden
          className={classes["icon"]}
        >
          <Icon data={mdiCircleMedium} />
        </div>
      </ItemIndicator>
      <span className={classes["label"]}>{label}</span>
      {renderShortcut()}
    </DropdownMenuRadioItem>
  );
};
