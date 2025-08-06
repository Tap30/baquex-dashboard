import {
  Badge,
  Calendar,
  type CalendarProps,
  CalendarType,
  Flex,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";
import type { MergeElementProps } from "@/types";
import {
  cn,
  formatDate,
  useControllableProp,
  useForkedRefs,
  useUniqueId,
} from "@/utils";
import { mdiCalendar } from "@mdi/js";

import { strings } from "@/static-content";
import { useEffect, useRef, useState } from "react";
import { type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { Text, type TextProps } from "../Text/index.ts";
import classes from "./styles.module.css";

export type DateValue = React.ComponentProps<typeof Calendar>["selected"];

export type DateInputProps = Omit<
  MergeElementProps<
    "button",
    {
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
       * Calendar properties.
       *
       * @see https://daypicker.dev/
       */
      calendarProps?: Partial<React.ComponentProps<typeof Calendar>>;

      /**
       * The controlled value of the calendar.
       * Should be used in conjunction with `onChange`.
       */
      value?: DateValue;

      /**
       * The value of the input when initially rendered.
       * Use when you do not need to control the state of the calendar.
       */
      defaultValue?: DateValue;

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
       * Event handler called when the value changes.
       */
      onChange?: (value: DateValue) => void;
    }
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
    className,
    id: idProp,
    startSlot,
    endSlot = <Icon data={mdiCalendar} />,
    label,
    description,
    errorText,
    feedback,
    onChange,
    value: valueProp,
    defaultValue,
    defaultOpen,
    open: openProp,
    size = "md",
    autoFocus = false,
    ref,
    hasError = false,
    hideLabel = false,
    disabled = false,
    readOnly = false,
    calendarProps = {},
    ...otherProps
  } = props;

  const {
    mode = "single",
    type = CalendarType.JALALI,
    ...otherCalendarProps
  } = calendarProps;

  const nodeId = useUniqueId();

  const inputRef = useRef<HTMLButtonElement | null>(null);
  const handleRef = useForkedRefs(ref, inputRef);

  const [value, setValue] = useControllableProp<DateValue>({
    fallbackValue:
      mode === "single"
        ? undefined
        : mode === "multiple"
          ? []
          : { from: undefined, to: undefined },
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
    if (!endSlot) return null;

    return <div className={classes["end-slot"]}>{endSlot}</div>;
  };

  const renderBadge = (text: string) => {
    return (
      <Badge
        aria-hidden
        key={text}
        tabIndex={-1}
        text={text}
        className={classes["badge"]}
      />
    );
  };

  const ariaLabel = hideLabel ? label : undefined;
  const ariaDescribedBy = description ? descId : undefined;
  const ariaInvalid = hasError;

  const getFormattedSlot = () => {
    if (!value) {
      return strings.components.dateInput.selectDate;
    }

    if (mode === "multiple") {
      if ((value as Date[]).length === 0) {
        return strings.components.dateInput.selectDate;
      }

      return (
        <Flex
          className={classes["value"]}
          gap="sm"
          wrapMode="wrap"
        >
          {(value as Date[]).map(value => renderBadge(formatDate(value)))}
        </Flex>
      );
    }

    if (mode === "range" && value && "from" in value && "to" in value) {
      const { from, to } = value;

      if (!from || !to || from === to)
        return strings.components.dateInput.selectDateRange;

      return (
        <Flex
          gap="sm"
          className={classes["value"]}
        >
          <span>{strings.from}</span>
          {renderBadge(formatDate(from))}
          <span>{strings.to}</span>
          {renderBadge(formatDate(to))}
        </Flex>
      );
    }

    return renderBadge(formatDate(value as Date));
  };

  const handleChange = (e: DateValue) => {
    if (readOnly || disabled) return;

    setValue(e);
    onChange?.(e);
  };

  const handleOpenChange = (newValue: boolean) => {
    if (readOnly || disabled) return;

    setOpen(newValue);
  };

  const renderCalendar = () => {
    if (mode === "single") {
      return (
        <Calendar
          {...(otherCalendarProps as CalendarProps<"single">)}
          selected={value as Date}
          onSelect={handleChange}
          type={type}
          mode="single"
        />
      );
    }

    if (mode === "multiple") {
      return (
        <Calendar
          {...(otherCalendarProps as CalendarProps<"multiple">)}
          selected={value as Date[]}
          onSelect={handleChange}
          type={type}
          mode="multiple"
        />
      );
    }

    if (mode === "range") {
      return (
        <Calendar
          {...(otherCalendarProps as CalendarProps<"range">)}
          selected={value as DateRange}
          onSelect={handleChange}
          type={type}
          mode="range"
        />
      );
    }

    return null;
  };

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
      <div
        id={controlId}
        className={classes["control"]}
        tabIndex={-1}
        inert={disabled}
      >
        <Popover
          open={open}
          onOpenChange={handleOpenChange}
        >
          <PopoverTrigger
            {...otherProps}
            id={inputId}
            ref={handleRef}
            disabled={disabled}
            autoFocus={autoFocus}
            className={classes["input"]}
            role="combobox"
            aria-describedby={ariaDescribedBy}
            aria-readonly={readOnly}
            aria-label={ariaLabel}
            aria-invalid={ariaInvalid}
            aria-haspopup="dialog"
          >
            <button>
              {renderStartSlot()}
              <div
                className={cn(classes["value"], classes["value-display"], {
                  [classes["placeholder"]!]: !value,
                })}
              >
                {getFormattedSlot()}
              </div>
              {renderEndSlot()}
            </button>
          </PopoverTrigger>
          <PopoverContent className={classes["dropdown"]}>
            {renderCalendar()}
          </PopoverContent>
        </Popover>
      </div>
      {renderFeedback()}
    </div>
  );
};
