import { Icon } from "@components/Icon";
import { Text, type TextProps } from "@components/Text";
import { mdiClock } from "@mdi/js";
import type { MergeElementProps } from "@types";
import { cn } from "@utils/cn";
import { useForkedRefs } from "@utils/use-forked-refs";
import { useUniqueId } from "@utils/use-unique-id";
import { useEffect, useRef, useState } from "react";
import classes from "./styles.module.css";

export type TimeInputProps = Omit<
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
       * The classnames of the component.
       */
      classNames?: Partial<
        Record<
          | "root"
          | "label"
          | "description"
          | "control"
          | "input"
          | "startSlot"
          | "endSlot"
          | "feedback",
          string
        >
      >;

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
    }
  >,
  | "children"
  | "type"
  | "checked"
  | "defaultChecked"
  | "aria-invalid"
  | "aria-describedby"
  | "aria-label"
  | "accept"
  | "placeholder"
  | "aria-labelledby"
  | "autoCapitalize"
  | "autoComplete"
>;

export const TimeInput: React.FC<TimeInputProps> = props => {
  const {
    ref,
    className,
    classNames,
    id: idProp,
    startSlot,
    endSlot = <Icon data={mdiClock} />,
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
    ...otherProps
  } = props;

  const nodeId = useUniqueId();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleRef = useForkedRefs(ref, inputRef);

  const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);

  const rootId = `TimeInput:Root_${nodeId}`;
  const labelId = `TimeInput:Label_${nodeId}`;
  const descId = `TimeInput:Description_${nodeId}`;
  const inputId = idProp ?? `TimeInput:Input_${nodeId}`;

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
    if (!endSlot) return null;

    return (
      <div className={cn(classes["end-slot"], classNames?.endSlot)}>
        {endSlot}
      </div>
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
    >
      {renderLabel()}
      {renderDescription()}
      <div className={cn(classes["control"], classNames?.control)}>
        {renderStartSlot()}
        <input
          {...otherProps}
          placeholder="test"
          ref={handleRef}
          type="time"
          step="1"
          autoFocus={autoFocus}
          id={inputId}
          readOnly={readOnly}
          inert={disabled}
          disabled={disabled}
          aria-invalid={ariaInvalid}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          className={cn(classes["input"], classNames?.input)}
        />
        {renderEndSlot()}
      </div>
      {renderFeedback()}
    </div>
  );
};
