import { Icon } from "@components/Icon";
import { Text, type TextProps } from "@components/Text";
import { mdiCircleMedium } from "@mdi/js";
import type { MergeElementProps } from "@types";
import { cn } from "@utils/cn";
import { useControllableProp } from "@utils/use-controllable-prop";
import { useUniqueId } from "@utils/use-unique-id";
import { useEffect, useState } from "react";
import classes from "./styles.module.css";

export type RadioProps = Omit<
  MergeElementProps<
    "button",
    {
      /**
       * The classnames of the component.
       */
      classNames?: Partial<
        Record<
          | "root"
          | "control"
          | "input"
          | "indicator"
          | "icon"
          | "label"
          | "feedback",
          string
        >
      >;

      /**
       * The controlled checked state of the radio.
       * Must be used in conjunction with `onChange`.
       */
      checked?: boolean;

      /**
       * The checked state of the radio when it is initially rendered.
       * Use when you do not need to control its checked state.
       */
      defaultChecked?: boolean;

      /**
       * When `true`, indicates that the user must check the radio before the
       * owning form can be submitted.
       */
      required?: boolean;

      /**
       * The value given as data when submitted with a `name`.
       */
      value?: string;

      /**
       * The name of the radio. Submitted with its owning form as part of a name/value pair.
       */
      name?: string;

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
       * Event handler called when the radio is selected.
       */
      onChange?: (checked: boolean) => void;
    }
  >,
  | "children"
  | "type"
  | "inputMode"
  | "defaultValue"
  | "aria-invalid"
  | "aria-label"
  | "aria-labelledby"
>;

export const Radio: React.FC<RadioProps> = props => {
  const {
    className,
    classNames,
    id: idProp,
    checked: checkedProp,
    defaultChecked,
    label,
    errorText,
    feedback,
    onChange,
    value,
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

  const [checked, setChecked] = useControllableProp({
    controlledPropValue: checkedProp,
    uncontrolledDefaultValueProp: defaultChecked,
    fallbackValue: false,
  });

  const rootId = `Radio:Root_${nodeId}`;
  const labelId = `Radio:Label_${nodeId}`;
  const descId = `Radio:Desc_${nodeId}`;
  const inputId = idProp ?? `Radio:Input_${nodeId}`;

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

  const handleChange = () => {
    if (disabled || readOnly) return;

    onChange?.(true);
    setChecked(true);
  };

  const renderIndicatorIcon = () => {
    if (!checked) return null;

    return (
      <div
        aria-hidden
        className={cn(classes["icon"], classNames?.icon)}
      >
        <Icon data={mdiCircleMedium} />
      </div>
    );
  };

  const renderLabel = () => {
    if (hideLabel) return null;

    const labelVariant = {
      lg: "body1",
      md: "body1",
      sm: "body2",
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
      <>
        {feedback && (
          <span
            className="sr-only"
            id={descId}
          >
            {feedback}
          </span>
        )}
        <Text
          as="p"
          role={role}
          variant={feedbackVariant}
          color={hasErrorText ? "negative" : "tertiary"}
          className={cn(classes["feedback"], classNames?.feedback)}
        >
          {feedbackOrErrorText}
        </Text>
      </>
    );
  };

  const ariaLabel = hideLabel ? label : undefined;
  const ariaDescribedBy = feedback ? descId : undefined;
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
      <div
        className={cn(classes["control"], classNames?.control, {
          [classes["checked"]!]: checked,
        })}
      >
        <button
          {...otherProps}
          type="button"
          role="radio"
          onClick={handleChange}
          autoFocus={autoFocus}
          id={inputId}
          value={value}
          disabled={disabled}
          aria-checked={checked}
          aria-invalid={ariaInvalid}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          className={cn(classes["input"], classNames?.input)}
        >
          <div className={cn(classes["indicator"], classNames?.indicator)}>
            {renderIndicatorIcon()}
          </div>
        </button>
        {renderLabel()}
      </div>
      {renderFeedback()}
    </div>
  );
};
