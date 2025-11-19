import { usePortalConfig } from "@components/Portal";
import { useDirection } from "@contexts/Direction";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { WithBaseProps, WithRef } from "@types";
import { cn } from "@utils/cn";
import { useIsomorphicValue } from "@utils/use-isomorphic-value";
import {
  CheckboxItem,
  NormalItem,
  RadioItem,
  SubItem,
} from "./components/index.internal.ts";
import classes from "./styles.module.css";
import type { MenuItem } from "./types.ts";

export type DropdownMenuProps = WithRef<
  WithBaseProps<
    {
      /**
       * The classnames of the component.
       */
      classNames?: Partial<
        Record<
          | "root"
          | "trigger"
          | "subTrigger"
          | "subContent"
          | "label"
          | "group"
          | "radioGroup"
          | "separator"
          | "item"
          | "checkboxItem"
          | "radioItem",
          string
        >
      >;

      /**
       * The menu items.
       */
      items: MenuItem[];

      /**
       * The size of the dropdown menu.
       *
       * @default "md"
       */
      size?: "sm" | "md" | "lg";

      /**
       * The screen-reader label of the menu.
       */
      label: string;

      /**
       * The controlled open state of the dropdown menu.
       * Must be used in conjunction with `onOpenChange`.
       */
      open?: boolean;

      /**
       * The open state of the dropdown menu when it is initially rendered.
       * Use when you do not need to control its open state.
       */
      defaultOpen?: boolean;

      /**
       * Event handler called when the open state of the dropdown menu changes.
       */
      onOpenChange?(open: boolean): void;

      /**
       * The modality of the dropdown menu.
       * When set to `true`, interaction with outside elements will be disabled
       * and only menu content will be visible to screen readers.
       */
      modal?: boolean;
    } & Pick<
      DropdownMenuPrimitive.DropdownMenuContentProps,
      | "onCloseAutoFocus"
      | "onEscapeKeyDown"
      | "onPointerDownOutside"
      | "onFocusOutside"
      | "onInteractOutside"
    >
  >,
  "div"
>;

export const DropdownMenu: React.FC<DropdownMenuProps> = props => {
  const {
    open,
    defaultOpen,
    items,
    ref,
    label,
    children,
    className,
    classNames,
    size = "md",
    modal = true,
    onOpenChange,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onFocusOutside,
    onInteractOutside,
    onPointerDownOutside,
  } = props;

  const { resolveContainer } = usePortalConfig();
  const container = useIsomorphicValue(resolveContainer, null);

  const direction = useDirection();

  const dropdownClassNames = cn(
    classes["root"],
    className,
    classes[size],
    classNames?.root,
  );

  const renderItems = (items: MenuItem[]) => {
    if (items.length === 0) return null;

    return items.map((item, idx) => {
      switch (item.type) {
        case "item": {
          const { label, type, icon, shortcut, disabled, onSelect } = item;
          const key = type + label + idx;

          return (
            <NormalItem
              key={key}
              label={label}
              icon={icon}
              shortcut={shortcut}
              disabled={disabled}
              onSelect={onSelect}
              className={cn(classes["item"], classNames?.item)}
            />
          );
        }

        case "checkbox-item": {
          const {
            label,
            type,
            checked,
            onSelect,
            onCheckedChange,
            shortcut,
            disabled,
          } = item;

          const key = type + label + idx;

          return (
            <CheckboxItem
              key={key}
              label={label}
              shortcut={shortcut}
              disabled={disabled}
              checked={checked}
              onCheckedChange={onCheckedChange}
              onSelect={onSelect}
              className={cn(classes["checkbox-item"], classNames?.checkboxItem)}
            />
          );
        }

        case "separator": {
          const key = item.type + idx;

          return (
            <DropdownMenuPrimitive.Separator
              key={key}
              className={cn(classes["separator"], classNames?.separator)}
            />
          );
        }

        case "radio-group": {
          const {
            radios,
            label,
            type,
            hideLabel = false,
            onValueChange,
            value,
          } = item;

          const key = type + label + idx;

          return (
            <DropdownMenuPrimitive.RadioGroup
              key={key}
              aria-label={label}
              value={value}
              onValueChange={onValueChange}
              className={cn(classes["radio-group"], classNames?.radioGroup)}
            >
              <DropdownMenuPrimitive.Label
                className={cn(classes["label"], classNames?.label)}
                hidden={hideLabel}
              >
                {label}
              </DropdownMenuPrimitive.Label>
              {radios.map((radio, idx) => (
                <RadioItem
                  key={radio.value + idx}
                  label={radio.label}
                  value={radio.value}
                  onSelect={radio.onSelect}
                  disabled={radio.disabled}
                  shortcut={radio.shortcut}
                  className={cn(classes["radio-item"], classNames?.radioItem)}
                />
              ))}
            </DropdownMenuPrimitive.RadioGroup>
          );
        }

        case "group": {
          const { items, label, type, hideLabel = false } = item;
          const key = type + label + idx;

          return (
            <DropdownMenuPrimitive.Group
              key={key}
              aria-label={label}
              className={cn(classes["group"], classNames?.group)}
            >
              <DropdownMenuPrimitive.Label
                className={cn(classes["label"], classNames?.label)}
                hidden={hideLabel}
              >
                {label}
              </DropdownMenuPrimitive.Label>
              {renderItems(items)}
            </DropdownMenuPrimitive.Group>
          );
        }

        case "sub": {
          const { type, items, label, icon, disabled } = item;
          const key = type + label + idx;

          return (
            <DropdownMenuPrimitive.Sub key={key}>
              <SubItem
                label={label}
                icon={icon}
                disabled={disabled}
                className={cn(classes["sub-trigger"], classNames?.subTrigger)}
              />
              <DropdownMenuPrimitive.Portal container={container}>
                <DropdownMenuPrimitive.SubContent
                  sideOffset={4}
                  alignOffset={-4}
                  className={dropdownClassNames}
                >
                  {renderItems(items)}
                </DropdownMenuPrimitive.SubContent>
              </DropdownMenuPrimitive.Portal>
            </DropdownMenuPrimitive.Sub>
          );
        }

        default:
          return null;
      }
    });
  };

  return (
    <DropdownMenuPrimitive.Root
      open={open}
      modal={modal}
      dir={direction}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <DropdownMenuPrimitive.Trigger
        asChild
        aria-label={label}
        className={cn(classes["trigger"], classNames?.trigger)}
      >
        {children}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal container={container}>
        <DropdownMenuPrimitive.Content
          ref={ref}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onCloseAutoFocus={onCloseAutoFocus}
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
          align="center"
          side="bottom"
          className={dropdownClassNames}
        >
          {renderItems(items)}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};
