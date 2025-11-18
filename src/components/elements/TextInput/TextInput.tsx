import { Text, type TextProps } from "@components/Text";
import type { MergeElementProps } from "@types";
import { cn } from "@utils/cn";
import { useUniqueId } from "@utils/use-unique-id";
import { useEffect, useState } from "react";
import classes from "./styles.module.css";

export type TextInputProps = Omit<
  MergeElementProps<
    "input",
    {
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
       * The `<input>` type to use. The type greatly changes how
       * the text field behaves.
       *
       * @default "text"
       */
      type?: Extract<
        React.ComponentProps<"input">["type"],
        "text" | "password" | "email" | "number" | "search" | "tel" | "url"
      >;

      /**
       * The controlled value of the input.
       * Should be used in conjunction with `onChange`.
       */
      value?: string;

      /**
       * The value of the input when initially rendered.
       * Use when you do not need to control the state of the input.
       */
      defaultValue?: string;

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

export const TextInput: React.FC<TextInputProps> = props => {
  const {
    className,
    classNames,
    id: idProp,
    startSlot,
    endSlot,
    label,
    description,
    errorText,
    feedback,
    type = "text",
    size = "md",
    autoFocus = false,
    hasError = false,
    hideLabel = false,
    disabled = false,
    readOnly = false,
    ...otherProps
  } = props;

  const nodeId = useUniqueId();

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
      data-error={hasError}
      data-disabled={disabled}
      data-readonly={readOnly}
      data-size={size}
    >
      {renderLabel()}
      {renderDescription()}
      <div className={cn(classes["control"], classNames?.control)}>
        {renderStartSlot()}
        <input
          {...otherProps}
          type={type}
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
