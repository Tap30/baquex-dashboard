import {
  Calendar,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";
import type { MergeElementProps } from "@/types";
import { cn, formatDate, useUniqueId } from "@/utils";
import { mdiCalendar } from "@mdi/js";

import { strings } from "@/static-content";
import { useEffect, useState } from "react";
import "react-day-picker/style.css";
import { Text, type TextProps } from "../Text/index.ts";
import classes from "./styles.module.css";

export type DateInputProps = Omit<
  MergeElementProps<
    "input",
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
       * Calendar properties.
       *
       * @see https://daypicker.dev/
       */
      calendarProps?: React.ComponentProps<typeof Calendar>;
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
    size = "md",
    autoFocus = false,
    hasError = false,
    hideLabel = false,
    disabled = false,
    readOnly = false,
    calendarProps = {},
    ...otherProps
  } = props;

  const nodeId = useUniqueId();

  // TODO: fix type
  const [selectedDate, setSelectedDate] = useState<
    Date | Date[] | { from: Date; to: Date } | undefined
  >();

  const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);

  const rootId = `TextInput:Root_${nodeId}`;
  const labelId = `TextInput:Label_${nodeId}`;
  const descId = `TextInput:Description_${nodeId}`;
  const inputId = idProp ?? `TextInput:Input_${nodeId}`;

  const feedbackOrErrorText = hasError && errorText ? errorText : feedback;

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

  const ariaLabel = hideLabel ? label : undefined;
  const ariaDescribedBy = description ? descId : undefined;
  const ariaInvalid = hasError;

  const getFormattedString = () => {
    if (!selectedDate) {
      return strings.components.dateInput.selectDate;
    }

    if (calendarProps?.mode === "multiple") {
      return (selectedDate as Date[]).map(formatDate).join(`${strings.comma} `);
    }

    if (calendarProps?.mode === "range") {
      const { from, to } = selectedDate as { from: Date; to: Date };

      if (from === to) {
        return formatDate(from);
      }

      return [strings.from, formatDate(from), strings.to, formatDate(to)].join(
        " ",
      );
    }

    return formatDate(selectedDate as Date);
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
      <Popover>
        <PopoverTrigger asChild>
          <div
            role="combobox"
            tabIndex={0}
            className={classes["control"]}
            aria-describedby={ariaDescribedBy}
            aria-label={ariaLabel}
            aria-invalid={ariaInvalid}
            aria-haspopup="dialog"
          >
            {renderStartSlot()}
            <div
              className={cn(classes["value"], classes["value-display"], {
                [classes["placeholder"]!]: !selectedDate,
              })}
            >
              {getFormattedString()}
            </div>
            {renderEndSlot()}
          </div>
        </PopoverTrigger>
        <PopoverContent className={classes["dropdown"]}>
          <Calendar
            disabled={disabled}
            selected={selectedDate}
            onSelect={setSelectedDate}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
      {renderFeedback()}
    </div>
  );
};
