import {
  Calendar,
  CalendarType,
  type CalendarProps,
} from "@/components/Calendar";
import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  type PopoverContentProps,
} from "@/components/Popover";
import { Text, type TextProps } from "@/components/Text";
import { strings } from "@/static-content";
import type { MergeElementProps } from "@/types";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/date";
import { useControllableProp } from "@/utils/use-controllable-prop";
import { useForkedRefs } from "@/utils/use-forked-refs";
import { useUniqueId } from "@/utils/use-unique-id";
import { mdiCalendar, mdiClose } from "@mdi/js";
import { useEffect, useRef, useState } from "react";
import { type DateRange } from "react-day-picker";
import classes from "./styles.module.css";
import { getValueDisplay } from "./utils.ts";

import "react-day-picker/style.css";

export type DateValue = Date | Date[] | DateRange | null;

export type DateInputProps = Omit<
  MergeElementProps<
    "button",
    Pick<
      PopoverContentProps,
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
       * Whether to hide the label or not.
       *
       * @default false
       */
      hideLabel?: boolean;

      /**
       * The text to display as a description.
       */
      description?: string;

      /**
       * Conveys additional information below the text input, such as how it should
       * be used.
       */
      feedback?: string;

      /**
       * The placeholder text to display when no item is selected.
       */
      placeholder?: string;

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
       * The name of the input.
       * Submitted with its owning form as part of a name/value pair.
       */
      name?: string;

      /**
       * Indicates whether or not a user should be able to edit the date input's
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
       * The open state of the input when it is initially rendered.
       * Use when you do not need to control its open state.
       */
      defaultOpen?: boolean;

      /**
       * The controlled open state of the input.
       * Must be used in conjunction with `onOpenChange`.
       */
      open?: boolean;

      /**
       * Event handler called when the open state of the select changes.
       */
      onOpenChange?: (open: boolean) => void;
    } & (
        | {
            /**
             * Enable the selection of a single day, multiple days, or a range of days.
             *
             * @see https://daypicker.dev/docs/selection-modes
             */
            mode: "single";

            /**
             * Calendar properties.
             *
             * @see https://daypicker.dev/
             */
            calendarProps?: Omit<CalendarProps<"single">, "mode">;

            /**
             * The controlled value of the calendar.
             * Should be used in conjunction with `onChange`.
             */
            value?: Date | null;

            /**
             * The value of the input when initially rendered.
             * Use when you do not need to control the state of the calendar.
             */
            defaultValue?: Date | null;

            /**
             * Event handler called when the value changes.
             */
            onChange?: (value: Date | null) => void;
          }
        | {
            mode: "multiple";
            calendarProps?: Omit<CalendarProps<"multiple">, "mode">;
            value?: Date[];
            defaultValue?: Date[];
            onChange?: (value: Date[]) => void;
          }
        | {
            mode: "range";
            calendarProps?: Omit<CalendarProps<"range">, "mode">;
            value?: DateRange | null;
            defaultValue?: DateRange | null;
            onChange?: (value: DateRange | null) => void;
          }
      )
  >,
  | "children"
  | "checked"
  | "defaultChecked"
  | "aria-invalid"
  | "aria-describedby"
  | "aria-label"
  | "aria-labelledby"
>;

export const DateInput: React.FC<DateInputProps> = props => {
  const {
    ref,
    className,
    id: idProp,
    startSlot,
    label,
    description,
    errorText,
    feedback,
    placeholder,
    name,
    mode,
    value: valueProp,
    open: openProp,
    defaultValue,
    defaultOpen,
    onChange,
    onOpenChange,
    onEscapeKeyDown,
    onPointerDownOutside,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    size = "md",
    autoFocus = false,
    hasError = false,
    hideLabel = false,
    disabled = false,
    readOnly = false,
    endSlot = <Icon data={mdiCalendar} />,
    calendarProps,
    ...otherProps
  } = props;

  const { type = CalendarType.JALALI, ...otherCalendarProps } =
    calendarProps ?? {};

  const nodeId = useUniqueId();

  const inputRef = useRef<HTMLButtonElement | null>(null);
  const handleRef = useForkedRefs(ref, inputRef);

  const [value, setValue] = useControllableProp<DateValue>({
    fallbackValue: mode === "single" ? null : mode === "multiple" ? [] : null,
    controlledPropValue: valueProp,
    uncontrolledDefaultValueProp: defaultValue,
  });

  const [open, setOpen] = useControllableProp({
    fallbackValue: false,
    controlledPropValue: openProp,
    uncontrolledDefaultValueProp: defaultOpen,
  });

  const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);

  const rootId = `DateInput:Root_${nodeId}`;
  const labelId = `DateInput:Label_${nodeId}`;
  const descId = `DateInput:Description_${nodeId}`;
  const controlId = `DateInput:Control_${nodeId}`;
  const inputId = idProp ?? `DateInput:Input_${nodeId}`;

  const feedbackOrErrorText = hasError && errorText ? errorText : feedback;

  useEffect(() => {
    if (refreshErrorAlert) {
      window.requestAnimationFrame(() => {
        setRefreshErrorAlert(false);
      });
    }
  }, [refreshErrorAlert]);

  useEffect(() => {
    if (hasError && errorText) {
      setRefreshErrorAlert(true);
    }
  }, [hasError, errorText]);

  const closeListAndMaintainFocus = () => {
    const trigger = document.getElementById(inputId ?? "");

    trigger?.focus();
    handleOpenChange(false);
  };

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled || readOnly) {
      event.preventDefault();

      return;
    }

    event.stopPropagation();

    closeListAndMaintainFocus();

    let newValue: DateValue;

    if (mode === "multiple") newValue = [];
    else newValue = null;

    handleChange(newValue);
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
    const valueDisplay = getValueDisplay(value);
    const shouldRenderClear = !readOnly && !disabled && valueDisplay.length > 0;

    if (!endSlot && !shouldRenderClear) return null;

    return (
      <div className={classes["end-slot"]}>
        {shouldRenderClear && (
          <IconButton
            aria-label={strings.clearValue}
            size={size === "sm" ? "sm" : "md"}
            icon={<Icon data={mdiClose} />}
            variant="ghost"
            onClick={handleClear}
          />
        )}
        {endSlot}
      </div>
    );
  };

  const handleChange = (newValue: DateValue) => {
    if (readOnly || disabled) return;

    setValue(newValue);
    (onChange as (value: DateValue) => void)?.(newValue);
  };

  const handleOpenChange = (openState: boolean) => {
    if (disabled || readOnly) return;

    onOpenChange?.(openState);
    setOpen(openState);
  };

  const handleControlClick: React.MouseEventHandler = () => {
    if (disabled || readOnly) return;

    inputRef.current?.click();
  };

  const renderValue = () => {
    const valueDisplay = getValueDisplay(value, formatDate);

    if (valueDisplay.length === 0) {
      return <span className={classes["placeholder"]}>{placeholder}</span>;
    }

    return <span className={classes["value"]}>{valueDisplay}</span>;
  };

  const renderHiddenInput = () => {
    if (!name) return null;
    if (!value) return null;

    const valueDisplay = getValueDisplay(value);

    return (
      <input
        type="hidden"
        name={name}
        disabled={disabled}
        value={valueDisplay}
      />
    );
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
      {renderHiddenInput()}
      {renderLabel()}
      {renderDescription()}
      <Popover
        open={open}
        onOpenChange={handleOpenChange}
      >
        <div
          id={controlId}
          className={classes["control"]}
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
            className={classes["input"]}
            aria-describedby={ariaDescribedBy}
            aria-readonly={readOnly}
            aria-label={ariaLabel}
            aria-invalid={ariaInvalid}
          >
            <button>{renderValue()}</button>
          </PopoverTrigger>
          {renderEndSlot()}
        </div>
        <PopoverContent
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          align="start"
          avoidCollisions={avoidCollisions}
          collisionBoundary={collisionBoundary}
          collisionPadding={collisionPadding}
          side="bottom"
          className={classes["content"]}
        >
          <Calendar
            {...otherCalendarProps}
            selected={value as Date}
            mode={mode as "single"}
            onSelect={handleChange}
            type={type}
          />
        </PopoverContent>
      </Popover>
      {renderFeedback()}
    </div>
  );
};
