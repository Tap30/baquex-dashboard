import { Badge } from "@components/Badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/Command";
import { Icon } from "@components/Icon";
import { IconButton } from "@components/IconButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  type PopoverContentProps,
} from "@components/Popover";
import { Text, type TextProps } from "@components/Text";
import { mdiCheck, mdiChevronDown, mdiClose } from "@mdi/js";
import { strings } from "@static-content";
import type { MergeElementPropsWithOmitted } from "@types";
import { cn } from "@utils/cn";
import { useControllableProp } from "@utils/use-controllable-prop";
import { useForkedRefs } from "@utils/use-forked-refs";
import { useUniqueId } from "@utils/use-unique-id";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import classes from "./styles.module.css";
import { getTitleMap, isGroup, normalizeValues } from "./utils.ts";

export type ComboBoxOption = {
  /**
   * The value given as data when submitted with a `name`.
   */
  value: string;

  /**
   * The text label of the option.
   */
  label: string;

  /**
   * The type of the item.
   */
  type: "option";

  /**
   * When `true`, prevents the user from interacting with the item.
   *
   * @default false
   */
  disabled?: boolean;
};

export type ComboBoxGroup = {
  /**
   * The text label of the group.
   */
  label: string;

  /**
   * The type of the item.
   */
  type: "group";

  /**
   * The items of the group.
   */
  items: Omit<ComboBoxOption, "type">[];
};

export type ComboBoxItem = ComboBoxOption | ComboBoxGroup;

export type ComboBoxProps = MergeElementPropsWithOmitted<
  "button",
  | "onSelect"
  | "children"
  | "type"
  | "defaultChecked"
  | "aria-invalid"
  | "aria-describedby"
  | "aria-label"
  | "aria-labelledby",
  Pick<
    PopoverContentProps,
    | "onEscapeKeyDown"
    | "onPointerDownOutside"
    | "avoidCollisions"
    | "collisionBoundary"
    | "collisionPadding"
  > &
    (
      | {
          /**
           * The select mode of the items.
           *
           * @default "single"
           */
          selectMode: "multiple";

          /**
           * The controlled value of the select.
           * Should be used in conjunction with `onChange`.
           */
          value?: string[];

          /**
           * The value of the select when initially rendered.
           * Use when you do not need to control the state of the select.
           */
          defaultValue?: string[];

          /**
           * Event handler called when the value changes.
           */
          onChange?: (value: string[]) => void;
        }
      | {
          selectMode: "single";
          value?: string;
          defaultValue?: string;
          onChange?: (value: string) => void;
        }
    ) & {
      /**
       * The classnames of the component.
       */
      classNames?: Partial<
        Record<
          | "root"
          | "label"
          | "description"
          | "trigger"
          | "control"
          | "input"
          | "chevron"
          | "startSlot"
          | "endSlot"
          | "clearButton"
          | "content"
          | "feedback",
          string
        >
      >;

      /**
       * The label of the input.
       */
      label: string;

      /**
       * The combobox items.
       */
      items: ComboBoxItem[];

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
       * Whether to make the input clearable or not (when a value is selected).
       *
       * @default true
       */
      clearable?: boolean;

      /**
       * Whether to make the input searchable or not.
       *
       * @default true
       */
      searchable?: boolean;

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
       * Whether or not the combo box contents was full width relative to the input.
       *
       * @default false
       */
      fullWidthContents?: boolean;

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
    }
>;

export const ComboBox: React.FC<ComboBoxProps> = props => {
  const {
    ref,
    classNames,
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
    selectMode = "single",
    required = false,
    autoFocus = false,
    hasError = false,
    hideLabel = false,
    clearable = true,
    searchable = true,
    fullWidthContents = false,
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

  const itemsKey = JSON.stringify(items);

  const [open, setOpen] = useControllableProp({
    fallbackValue: false,
    controlledPropValue: openProp,
    uncontrolledDefaultValueProp: defaultOpen,
  });

  const [value, setValue] = useControllableProp({
    fallbackValue: selectMode === "single" ? "" : [],
    controlledPropValue: valueProp,
    uncontrolledDefaultValueProp: defaultValue,
  });

  const rootId = `ComboBox:Root_${nodeId}`;
  const labelId = `ComboBox:Label_${nodeId}`;
  const descId = `ComboBox:Description_${nodeId}`;
  const controlId = `ComboBox:Control_${nodeId}`;
  const inputId = idProp ?? `ComboBox:Input_${nodeId}`;

  const feedbackOrErrorText = hasError && errorText ? errorText : feedback;

  const titleMap = useMemo(
    () => getTitleMap(items),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemsKey],
  );

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
        "--combobox-content-width",
        `${control.offsetWidth}px`,
      );
    },
    [controlId],
  );

  const handleControlClick: React.MouseEventHandler = () => {
    if (disabled || readOnly) return;

    inputRef.current?.click();
  };

  const handleOpenChange = (openState: boolean) => {
    if (disabled || readOnly) return;

    onOpenChange?.(openState);
    setOpen(openState);
  };

  const handleItemSelect = (itemValue: string) => {
    if (disabled || readOnly) return;

    let newValue: string | string[];

    if (selectMode === "single") {
      newValue = itemValue;

      handleOpenChange(false);
    } else {
      const isSelected =
        (value as string[]).some(v => v === itemValue) ?? false;

      if (isSelected) {
        newValue = (value as string[]).filter(v => v !== itemValue);
      } else {
        newValue = (value as string[]).concat(itemValue);
      }
    }

    onChange?.(newValue as string & string[]);
    setValue(newValue);
  };

  const handleItemRemove = (itemValue: string) => {
    if (disabled || readOnly) return;

    let newValue: string | string[];

    if (selectMode === "single") newValue = "";
    else newValue = (value as string[]).filter(v => v !== itemValue);

    onChange?.(newValue as string & string[]);
    setValue(newValue);
  };

  const closeListAndMaintainFocus = () => {
    const trigger = document.getElementById(inputId ?? "");

    trigger?.focus();
    handleOpenChange(false);
  };

  const makeItemRemoveHandler =
    (itemValue: string) => (event: React.MouseEvent<HTMLElement>) => {
      if (disabled || readOnly) {
        event.preventDefault();

        return;
      }

      event.stopPropagation();

      closeListAndMaintainFocus();
      handleItemRemove(itemValue);
    };

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled || readOnly) {
      event.preventDefault();

      return;
    }

    event.stopPropagation();

    closeListAndMaintainFocus();

    let newValue: string | string[];

    if (selectMode === "single") newValue = "";
    else newValue = [];

    onChange?.(newValue as string & string[]);
    setValue(newValue);
  };

  const handleInputKeyDown: React.KeyboardEventHandler<
    HTMLInputElement
  > = event => {
    if (event.key !== "Backspace") return;

    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue.trim()) return;

    if (disabled || readOnly) {
      event.preventDefault();
      return;
    }

    if (typeof value === "string") {
      handleClear(event as unknown as React.MouseEvent<HTMLElement>);
    } else {
      const lastValue = value[value.length - 1];

      if (!lastValue) return;
      handleItemRemove(lastValue);
    }
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
        className={cn(classes["label"], classNames?.label)}
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
        className={cn(classes["description"], classNames?.description)}
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
        className={cn(classes["feedback"], classNames?.feedback)}
      >
        {feedbackOrErrorText}
      </Text>
    );
  };

  const renderStartSlot = () => {
    if (!startSlot) return null;

    return (
      <div className={cn(classes["start-slot"], classNames?.startSlot)}>
        {startSlot}
      </div>
    );
  };

  const renderEndSlot = () => {
    const values = normalizeValues(value);
    const shouldRenderClear =
      !readOnly && !disabled && values.length > 0 && clearable;

    return (
      <div className={cn(classes["end-slot"], classNames?.endSlot)}>
        {endSlot}
        {shouldRenderClear && (
          <IconButton
            tabIndex={-1}
            aria-hidden
            aria-label={strings.clearValue}
            size={size === "sm" ? "sm" : "md"}
            icon={<Icon data={mdiClose} />}
            variant="ghost"
            className={cn(classNames?.clearButton)}
            onClick={handleClear}
          />
        )}
      </div>
    );
  };

  const renderOptions = (options: Omit<ComboBoxOption, "type">[]) => {
    const values = normalizeValues(value);

    return options.map(option => {
      const key = option.label + option.value;

      return (
        <CommandItem
          key={key}
          className={classes["item"]}
          value={option.value}
          disabled={option.disabled}
          onSelect={handleItemSelect}
          keywords={[option.label]}
          explicitlySelected={values.includes(option.value)}
        >
          <span className={classes["item-text"]}>{option.label}</span>
          <div className={classes["item-indicator"]}>
            <Icon data={mdiCheck} />
          </div>
        </CommandItem>
      );
    });
  };

  const renderItems = () => {
    return items.map(item => {
      if (isGroup(item)) {
        const key = item.label;

        return (
          <CommandGroup
            label={item.label}
            key={key}
            className={classes["group"]}
          >
            <div className={classes["group-items"]}>
              {renderOptions(item.items)}
            </div>
          </CommandGroup>
        );
      }

      return renderOptions([item]);
    });
  };

  const renderValue = () => {
    const values = normalizeValues(value);

    if (values.length === 0) {
      return <span className={classes["placeholder"]}>{placeholder}</span>;
    }

    if (selectMode === "single") {
      return (
        <span className={classes["value"]}>{titleMap.get(values[0]!)}</span>
      );
    }

    return values.map((v, idx) => {
      const handleClose = makeItemRemoveHandler(v);

      const handleClick: React.MouseEventHandler<HTMLElement> = event => {
        event.preventDefault();

        handleClose(event);
      };

      return (
        <Badge
          aria-hidden
          tabIndex={-1}
          key={v + idx}
          text={titleMap.get(v) ?? ""}
          className={classes["badge"]}
          action={{
            icon: <Icon data={mdiClose} />,
            tabIndex: -1,
            as: "div",
            label: strings.close,
            onClick: handleClick,
          }}
        />
      );
    });
  };

  const renderHiddenInput = () => {
    if (!name) return null;

    const renderOptions = () => {
      if (selectMode === "single") return <option value={value as string} />;

      return (value as string[]).map(value => (
        <option
          key={value}
          value={value}
        />
      ));
    };

    return (
      <select
        inert
        onFocus={e => void (e.preventDefault(), e.stopPropagation())}
        onChange={() => void 0}
        className="sr-only"
        aria-hidden
        required={required}
        tabIndex={-1}
        multiple={selectMode === "multiple"}
        disabled={disabled}
        value={value}
        name={name}
      >
        {renderOptions()}
      </select>
    );
  };

  const ariaLabel = hideLabel ? label : undefined;
  const ariaDescribedBy = description ? descId : undefined;
  const ariaInvalid = hasError;

  return (
    <div
      id={rootId}
      className={cn(
        classes["root"],
        classes[size],
        className,
        classNames?.root,
        {
          [classes["has-error"]!]: hasError,
          [classes["disabled"]!]: disabled,
          [classes["readonly"]!]: readOnly,
        },
      )}
      data-size={size}
      data-error={hasError}
      data-disabled={disabled}
      data-readonly={readOnly}
      data-open={open}
      data-select-mode={selectMode}
    >
      {renderHiddenInput()}
      {renderLabel()}
      {renderDescription()}
      <Popover
        open={open}
        onOpenChange={handleOpenChange}
      >
        <div
          id={controlId}
          className={cn(classes["control"], classNames?.control)}
          tabIndex={-1}
          onClick={handleControlClick}
          inert={disabled}
        >
          {renderStartSlot()}
          <PopoverTrigger
            {...otherProps}
            id={inputId}
            ref={handleRef}
            disabled={disabled}
            autoFocus={autoFocus}
            className={cn(classes["input"], classNames?.input)}
            aria-readonly={readOnly}
            aria-label={ariaLabel}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
          >
            <button>{renderValue()}</button>
          </PopoverTrigger>
          {renderEndSlot()}
          <div
            className={cn(
              open ? "rotate-180" : "rotate-0",
              classes["chevron"],
              classNames?.chevron,
            )}
          >
            <Icon data={mdiChevronDown} />
          </div>
        </div>
        <PopoverContent
          ref={contentRefCallback}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          align="start"
          avoidCollisions={avoidCollisions}
          collisionBoundary={collisionBoundary}
          collisionPadding={collisionPadding}
          side="bottom"
          className={cn(classes["content"], classNames?.content, {
            [classes["full-width"]!]: fullWidthContents,
            [classes["searchable"]!]: searchable,
          })}
        >
          <Command
            label={label}
            shouldFilter={searchable}
            filter={(_, search, keywords) => {
              const searchTerms = (keywords ?? []).join(" ").toLowerCase();

              if (searchTerms.includes(search.toLowerCase())) return 1;
              return 0;
            }}
          >
            <CommandInput
              className={classes["searchbox"]}
              placeholder={strings.search}
              onKeyDown={handleInputKeyDown}
            />
            <CommandList
              label={strings.options}
              aria-multiselectable={selectMode === "multiple"}
            >
              <CommandEmpty>{strings.empty}</CommandEmpty>
              {renderItems()}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {renderFeedback()}
    </div>
  );
};
