import { Icon, Text, usePortalConfig, type TextProps } from "@/components";
import type { MergeElementProps } from "@/types";
import {
  cn,
  useControllableProp,
  useForkedRefs,
  useIsomorphicValue,
  useUniqueId,
} from "@/utils";
import { mdiCheck, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./styles.module.css";
import { isGroup } from "./utils.ts";

export type SelectOption = {
  /**
   * The value given as data when submitted with a `name`.
   */
  value: string;

  /**
   * The text label of the option.
   */
  label: string;

  /**
   * When true, prevents the user from interacting with the item.
   *
   * @default false
   */
  disabled?: boolean;
};

export type SelectGroup = {
  /**
   * The text label of the group.
   */
  label: string;

  /**
   * The items of the group.
   */
  items: SelectOption[];
};

export type SelectItem = SelectOption | SelectGroup;

export type SelectInputProps = Omit<
  MergeElementProps<
    "button",
    Pick<
      SelectPrimitive.SelectContentProps,
      | "onEscapeKeyDown"
      | "onPointerDownOutside"
      | "avoidCollisions"
      | "collisionBoundary"
      | "collisionPadding"
    > & {
      /**
       * The label of the input.
       */
      label: string;

      /**
       * The select items.
       */
      items: SelectItem[];

      /**
       * The controlled value of the select.
       * Should be used in conjunction with `onChange`.
       */
      value?: string;

      /**
       * The value of the select when initially rendered.
       * Use when you do not need to control the state of the select.
       */
      defaultValue?: string;

      /**
       * The open state of the select when it is initially rendered.
       * Use when you do not need to control its open state.
       */
      defaultOpen?: boolean;

      /**
       * The controlled open state of the select.
       * Must be used in conjunction with `onOpenChange`.
       */
      open?: boolean;

      /**
       * The name of the select.
       * Submitted with its owning form as part of a name/value pair.
       */
      name?: string;

      /**
       * Whether to hide the label or not.
       *
       * @default false
       */
      hideLabel?: boolean;

      /**
       * When `true`, indicates that the user must select an option before the
       * owning form can be submitted.
       *
       * @default false
       */
      required?: boolean;

      /**
       * The text to display as a description.
       */
      description?: string;

      /**
       * The placeholder text to display when no item is selected.
       */
      placeholder?: string;

      /**
       * Conveys additional information below the text input, such as how it should
       * be used.
       */
      feedback?: string;

      /**
       * Gets or sets whether or not the text input is in a visually invalid state.
       *
       * This error state overrides the error state controlled by
       * `reportValidity()`.
       *
       * @default false
       */
      hasError?: boolean;

      /**
       * The error message that replaces feedback when `error` is true. If
       * `errorText` is an empty string, then the feedback will continue to
       * show.
       */
      errorText?: string;

      /**
       * The size of the input.
       *
       * @default "md"
       */
      size?: "sm" | "md" | "lg";

      /**
       * Indicates whether or not a user should be able to edit the text input's
       * value.
       *
       * @default false
       */
      readOnly?: boolean;

      /**
       * Whether or not the element is disabled.
       *
       * @default false
       */
      disabled?: boolean;

      /**
       * Indicates that the element should be focused on mount.
       *
       * @default false
       */
      autoFocus?: boolean;

      /**
       * The slot used for element placed at the start.
       */
      startSlot?: React.ReactNode;

      /**
       * The slot used for element placed at the end.
       */
      endSlot?: React.ReactNode;

      /**
       * Event handler called when the open state of the select changes.
       */
      onOpenChange?: (open: boolean) => void;

      /**
       * Event handler called when the value changes.
       */
      onChange?: (value: string) => void;
    }
  >,
  | "children"
  | "type"
  | "checked"
  | "defaultChecked"
  | "aria-invalid"
  | "aria-describedby"
  | "aria-label"
  | "aria-labelledby"
>;

export const SelectInput: React.FC<SelectInputProps> = props => {
  const {
    ref,
    open: openProp,
    defaultOpen,
    value: valueProp,
    items,
    defaultValue,
    name,
    className,
    id: idProp,
    startSlot,
    endSlot,
    label,
    description,
    errorText,
    feedback,
    placeholder,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    size = "md",
    required = false,
    autoFocus = false,
    hasError = false,
    hideLabel = false,
    disabled = false,
    readOnly = false,
    onEscapeKeyDown,
    onPointerDownOutside,
    onOpenChange,
    onChange,
    ...otherProps
  } = props;

  const nodeId = useUniqueId();

  const inputRef = useRef<HTMLButtonElement | null>(null);
  const handleRef = useForkedRefs(ref, inputRef);

  const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);

  const [open, setOpen] = useControllableProp({
    fallbackValue: false,
    controlledPropValue: openProp,
    uncontrolledDefaultValueProp: defaultOpen,
  });

  const [value, setValue] = useControllableProp({
    fallbackValue: "",
    controlledPropValue: valueProp,
    uncontrolledDefaultValueProp: defaultValue,
  });

  const rootId = `SelectInput:Root_${nodeId}`;
  const labelId = `SelectInput:Label_${nodeId}`;
  const descId = `SelectInput:Description_${nodeId}`;
  const controlId = `SelectInput:Control_${nodeId}`;
  const inputId = idProp ?? `SelectInput:Input_${nodeId}`;

  const feedbackOrErrorText = hasError && errorText ? errorText : feedback;

  const { resolveContainer } = usePortalConfig();
  const container = useIsomorphicValue(resolveContainer, null);

  useEffect(() => {
    if (refreshErrorAlert) {
      // The past render cycle removed the role="alert" from the error message.
      // Re-add it after an animation frame to re-announce the error.
      window.requestAnimationFrame(() => {
        setRefreshErrorAlert(false);
      });
    }
  }, [refreshErrorAlert]);

  useEffect(() => {
    if (hasError && errorText) {
      /**
       * Re-announces the field's error to screen readers.
       * Error text announces to screen readers anytime it is visible and changes.
       */
      setRefreshErrorAlert(true);
    }
  }, [hasError, errorText]);

  const contentRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const control = document.getElementById(controlId);

      if (!control) return;

      node?.style.setProperty(
        "--select-input-content-width",
        `${control.offsetWidth}px`,
      );
    },
    [controlId],
  );

  const handleClick: React.MouseEventHandler = () => {
    if (disabled || readOnly) return;

    inputRef.current?.click();
  };

  const handleOpenChange = (openState: boolean) => {
    if (disabled || readOnly) return;

    onOpenChange?.(openState);
    setOpen(openState);
  };

  const handleValueChange = (value: string) => {
    if (disabled || readOnly) return;

    onChange?.(value);
    setValue(value);
  };

  const renderLabel = () => {
    if (hideLabel) return null;

    const labelVariant = {
      lg: "subheading1",
      md: "subheading1",
      sm: "subheading2",
    }[size] as TextProps["variant"];

    return (
      <Text
        as="label"
        id={labelId}
        htmlFor={inputId}
        variant={labelVariant}
        className={classes["label"]}
      >
        {label}
      </Text>
    );
  };

  const renderDescription = () => {
    if (!description) return null;

    const descVariant = {
      lg: "body1",
      md: "body1",
      sm: "body2",
    }[size] as TextProps["variant"];

    return (
      <Text
        id={descId}
        as="p"
        variant={descVariant}
        color="secondary"
        className={classes["description"]}
      >
        {description}
      </Text>
    );
  };

  const renderFeedback = () => {
    if (!feedback && !errorText) return null;
    if (!feedbackOrErrorText) return null;

    // Announce if there is an error and error text visible.
    // If `refreshErrorAlert` is true, do not announce. This will remove the
    // role="alert" attribute. Another render cycle will happen after an
    // animation frame to re-add the role.
    const shouldAnnounceError = hasError && errorText && !refreshErrorAlert;
    const role = shouldAnnounceError ? "alert" : undefined;
    const hasErrorText = hasError && !!errorText;

    const feedbackVariant = {
      lg: "body2",
      md: "body2",
      sm: "caption",
    }[size] as TextProps["variant"];

    return (
      <Text
        as="p"
        role={role}
        variant={feedbackVariant}
        color={hasErrorText ? "negative" : "tertiary"}
        className={classes["feedback"]}
      >
        {feedbackOrErrorText}
      </Text>
    );
  };

  const renderStartSlot = () => {
    if (!startSlot) return null;

    return <div className={classes["start-slot"]}>{startSlot}</div>;
  };

  const renderEndSlot = () => {
    if (!endSlot) return null;

    return <div className={classes["end-slot"]}>{endSlot}</div>;
  };

  const renderOptions = (options: SelectOption[]) => {
    return options.map(option => {
      const key = option.label + option.value;

      return (
        <SelectPrimitive.Item
          key={key}
          className={classes["item"]}
          value={option.value}
          disabled={option.disabled}
        >
          <SelectPrimitive.ItemText className={classes["item-text"]}>
            {option.label}
          </SelectPrimitive.ItemText>
          <SelectPrimitive.ItemIndicator className={classes["item-indicator"]}>
            <Icon data={mdiCheck} />
          </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
      );
    });
  };

  const renderItems = () => {
    return items.map(item => {
      if (isGroup(item)) {
        const key = item.label;

        return (
          <SelectPrimitive.Group
            key={key}
            className={classes["group"]}
          >
            <SelectPrimitive.Label className={classes["group-label"]}>
              {item.label}
            </SelectPrimitive.Label>
            <div className={classes["group-items"]}>
              {renderOptions(item.items)}
            </div>
          </SelectPrimitive.Group>
        );
      }

      return renderOptions([item]);
    });
  };

  const ariaLabel = hideLabel ? label : undefined;
  const ariaDescribedBy = description ? descId : undefined;
  const ariaInvalid = hasError;

  return (
    <div
      id={rootId}
      className={cn(classes["root"], classes[size], className, {
        [classes["has-error"]!]: hasError,
        [classes["disabled"]!]: disabled,
        [classes["readonly"]!]: readOnly,
      })}
    >
      {renderLabel()}
      {renderDescription()}
      <SelectPrimitive.Root
        required={required}
        open={open}
        value={value}
        disabled={disabled}
        onOpenChange={handleOpenChange}
        onValueChange={handleValueChange}
        name={name}
      >
        <div
          id={controlId}
          className={classes["control"]}
          tabIndex={-1}
          onClick={handleClick}
          inert={disabled}
        >
          {renderStartSlot()}
          <SelectPrimitive.Trigger
            {...otherProps}
            ref={handleRef}
            id={inputId}
            disabled={disabled}
            autoFocus={autoFocus}
            className={classes["input"]}
            aria-readonly={readOnly}
            aria-label={ariaLabel}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
          </SelectPrimitive.Trigger>
          {renderEndSlot()}
          <SelectPrimitive.Icon className={classes["select-icon"]}>
            <Icon data={mdiChevronDown} />
          </SelectPrimitive.Icon>
        </div>
        <SelectPrimitive.Portal container={container}>
          <SelectPrimitive.Content
            ref={contentRefCallback}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            align="start"
            avoidCollisions={avoidCollisions}
            collisionBoundary={collisionBoundary}
            collisionPadding={collisionPadding}
            side="bottom"
            position="popper"
            className={classes["content"]}
          >
            <SelectPrimitive.ScrollUpButton
              className={classes["scroll-indicator"]}
              data-position="top"
            >
              <Icon
                size={16}
                data={mdiChevronUp}
              />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className={classes["viewport"]}>
              {renderItems()}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton
              className={classes["scroll-indicator"]}
              data-position="down"
            >
              <Icon
                size={16}
                data={mdiChevronDown}
              />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {renderFeedback()}
    </div>
  );
};
