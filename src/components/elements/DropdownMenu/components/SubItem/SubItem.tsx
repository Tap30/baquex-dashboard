import { Icon } from "@components/Icon";
import { useDirection } from "@contexts/Direction";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { SubTrigger as DropdownSubItem } from "@radix-ui/react-dropdown-menu";
import { cn } from "@utils/cn";
import type { MenuNormalItem } from "../../types.ts";
import classes from "./styles.module.css";

export type SubItemProps = Omit<
  MenuNormalItem,
  "type" | "shortcut" | "onSelect"
> & {
  className?: string;
};

export const SubItem: React.FC<SubItemProps> = props => {
  const { className, label, disabled = false, icon } = props;

  const direction = useDirection();

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

  return (
    <DropdownSubItem
      disabled={disabled}
      textValue={label}
      className={cn(classes["root"], className)}
    >
      {renderIcon()}
      <span className={classes["label"]}>{label}</span>
      <div
        aria-hidden
        className={classes["icon"]}
      >
        <Icon data={direction === "ltr" ? mdiChevronRight : mdiChevronLeft} />
      </div>
    </DropdownSubItem>
  );
};
