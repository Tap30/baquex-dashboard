import type { MergeElementProps } from "@/types";
import { cn, useControllableProp } from "@/utils";
import { mdiCircleMedium } from "@mdi/js";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useEffect, useId, useState } from "react";
import { Icon } from "../Icon.tsx";
import { Text, type TextProps } from "../Text/index.ts";
import classes from "./styles.module.css";

type Item = {
  /**
   * The value given as data when submitted with a `name`.
   */
  value: string;

  /**
   * The visible label of the item.
   */
  label: string;
};

export type RadioGroupProps = Omit<
  MergeElementProps<
    "div",
    {
      /**
       * The controlled value of the radio item to check.
       * Should be used in conjunction with `onChange`.
       */
      value?: string;

      /**
       * The value of the radio item that should be checked when initially rendered.
       * Use when you do not need to control the state of the radio items.
       */
      defaultValue?: string;

      /**
       * When `true`, indicates that the user must check a radio item before the
       * owning form can be submitted.
       */
      required?: boolean;

      /**
       * The orientation of the component.
       *
       * @default "vertical"
       */
      orientation?: "horizontal" | "vertical";

      /**
       * The array of items.
       */
      items: Item[];

      /**
       * The name of the group. Submitted with its owning form as part of a name/value pair.
       */
      name?: string;

      /**
       * The label of the input.
       */
      label: string;

      /**
       * The text to display as a description.
       */
      description?: string;

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
       * Event handler called when the value changes.
       */
      onChange?: RadioGroupPrimitive.RadioGroupProps["onValueChange"];
    }
  >,
  | "dir"
  | "children"
  | "type"
  | "inputMode"
  | "checked"
  | "defaultChecked"
  | "aria-invalid"
  | "aria-label"
  | "aria-labelledby"
>;

export const RadioGroup: React.FC<RadioGroupProps> = props => {
  const {
    className,
    id: idProp,
    value: valueProp,
    defaultValue,
    description,
    label,
    errorText,
    feedback,
    items,
    onChange,
    orientation = "vertical",
    size = "md",
    hasError = false,
    hideLabel = false,
    disabled = false,
    readOnly = false,
    ...otherProps
  } = props;

  const nodeId = useId();

  const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);

  const [value, setValue] = useControllableProp({
    controlledPropValue: valueProp,
    uncontrolledDefaultValueProp: defaultValue,
    fallbackValue: "",
  });

  const rootId = `RadioGroup:Root_${nodeId}`;
  const labelId = `RadioGroup:Label_${nodeId}`;
  const descId = `RadioGroup:Desc_${nodeId}`;
  const groupId = idProp ?? `RadioGroup:Group_${nodeId}`;

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

  const handleChange: RadioGroupPrimitive.RadioGroupProps["onValueChange"] =
    valueState => {
      if (disabled || readOnly) return;

      onChange?.(valueState);
      setValue(valueState);
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
        htmlFor={groupId}
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

  const renderIndicatorIcon = () => {
    if (!value) return null;

    return (
      <div
        aria-hidden
        className={classes["radio-icon"]}
      >
        <Icon data={mdiCircleMedium} />
      </div>
    );
  };

  const renderItems = () => {
    if (items.length === 0) return null;

    const labelVariant = {
      lg: "body1",
      md: "body1",
      sm: "body2",
    }[size] as TextProps["variant"];

    return items.map(item => {
      const radioId = `RadioGroup:Radio_${nodeId}_${item.value}`;
      const radioKey = item.value + item.label;
      const isChecked = value === item.value;

      return (
        <div
          key={radioKey}
          className={cn(classes["control"], {
            [classes["checked"]!]: isChecked,
          })}
        >
          <RadioGroupPrimitive.Item
            id={radioId}
            value={item.value}
            className={classes["radio"]}
          >
            <RadioGroupPrimitive.Indicator className={classes["indicator"]}>
              {renderIndicatorIcon()}
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
          <Text
            as="label"
            htmlFor={radioId}
            variant={labelVariant}
            className={classes["radio-label"]}
          >
            {label}
          </Text>
        </div>
      );
    });
  };

  const ariaLabel = label;
  const ariaDescribedBy = description ? descId : undefined;
  const ariaInvalid = hasError;

  return (
    <div
      id={rootId}
      className={cn(
        classes["root"],
        classes[size],
        classes[orientation],
        className,
        {
          [classes["has-error"]!]: hasError,
          [classes["disabled"]!]: disabled,
          [classes["readonly"]!]: readOnly,
        },
      )}
    >
      {renderLabel()}
      {renderDescription()}
      <RadioGroupPrimitive.Root
        {...otherProps}
        value={value}
        orientation={orientation}
        onValueChange={handleChange}
        id={groupId}
        inert={disabled}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={classes["group"]}
      >
        {renderItems()}
      </RadioGroupPrimitive.Root>
      {renderFeedback()}
    </div>
  );
};
