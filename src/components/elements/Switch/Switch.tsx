import { Text, type TextProps } from "@/components/Text";
import type { MergeElementProps } from "@/types";
import { cn } from "@/utils/cn";
import { useControllableProp } from "@/utils/use-controllable-prop";
import { useUniqueId } from "@/utils/use-unique-id";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { useEffect, useState } from "react";
import classes from "./styles.module.css";

export type SwitchProps = Omit<
  MergeElementProps<
    "button",
    {
      /**
       * The controlled checked state of the switch.
       * Must be used in conjunction with `onChange`.
       */
      checked?: boolean;

      /**
       * The checked state of the switch when it is initially rendered.
       * Use when you do not need to control its checked state.
       */
      defaultChecked?: boolean;

      /**
       * When `true`, indicates that the user must check the switch before the
       * owning form can be submitted.
       */
      required?: boolean;

      /**
       * The value given as data when submitted with a `name`.
       */
      value?: string;

      /**
       * The name of the switch. Submitted with its owning form as part of a name/value pair.
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
       * Event handler called when the checked state of the switch changes.
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

export const Switch: React.FC<SwitchProps> = props => {
  const {
    className,
    id: idProp,
    checked: checkedProp,
    defaultChecked,
    label,
    errorText,
    feedback,
    onChange,
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

  const rootId = `Switch:Root_${nodeId}`;
  const labelId = `Switch:Label_${nodeId}`;
  const descId = `Switch:Desc_${nodeId}`;
  const inputId = idProp ?? `Switch:Input_${nodeId}`;

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

  const handleChange: SwitchPrimitive.SwitchProps["onCheckedChange"] =
    checkedState => {
      if (disabled || readOnly) return;

      onChange?.(checkedState);
      setChecked(checkedState);
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
        className={classes["label"]}
      >
        {label}
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
          className={classes["feedback"]}
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
      className={cn(classes["root"], classes[size], className, {
        [classes["has-error"]!]: hasError,
        [classes["disabled"]!]: disabled,
        [classes["readonly"]!]: readOnly,
      })}
    >
      <div className={classes["control"]}>
        {renderLabel()}
        <SwitchPrimitive.Root
          {...otherProps}
          checked={checked}
          onCheckedChange={handleChange}
          autoFocus={autoFocus}
          id={inputId}
          inert={disabled}
          disabled={disabled}
          aria-invalid={ariaInvalid}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          className={classes["input"]}
        >
          <SwitchPrimitive.Thumb className={classes["thumb"]} />
        </SwitchPrimitive.Root>
      </div>
      {renderFeedback()}
    </div>
  );
};
