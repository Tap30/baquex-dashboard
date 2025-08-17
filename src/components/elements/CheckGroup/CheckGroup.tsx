import { CheckBox } from "@components/CheckBox";
import { Text, type TextProps } from "@components/Text";
import type { MergeElementProps } from "@types";
import { cn } from "@utils/cn";
import { useControllableProp } from "@utils/use-controllable-prop";
import { useUniqueId } from "@utils/use-unique-id";
import { useEffect, useState } from "react";
import classes from "./styles.module.css";

export type CheckItem = {
  /**
   * The value given as data when submitted with a `name`.
   */
  value: string;

  /**
   * The visible label of the item.
   */
  label: string;
};

export type CheckGroupProps = Omit<
  MergeElementProps<
    "div",
    {
      /**
       * The controlled value of the check item to check.
       * Should be used in conjunction with `onChange`.
       */
      value?: string[];

      /**
       * The value of the check item that should be checked when initially rendered.
       * Use when you do not need to control the state of the check items.
       */
      defaultValue?: string[];

      /**
       * When `true`, indicates that the user must check a check item before the
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
      items: CheckItem[];

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
      onChange?: (value: string[]) => void;
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

export const CheckGroup: React.FC<CheckGroupProps> = props => {
  const {
    className,
    id: idProp,
    value: valueProp,
    name,
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

  const nodeId = useUniqueId();

  const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);

  const [value, setValue] = useControllableProp({
    controlledPropValue: valueProp,
    uncontrolledDefaultValueProp: defaultValue,
    fallbackValue: [],
  });

  const rootId = `CheckGroup:Root_${nodeId}`;
  const labelId = `CheckGroup:Label_${nodeId}`;
  const descId = `CheckGroup:Desc_${nodeId}`;
  const groupId = idProp ?? `CheckGroup:Group_${nodeId}`;

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

  const handleChange = (newCheckedState: boolean, itemValue: string) => {
    if (disabled || readOnly) return;

    const newValue = !newCheckedState
      ? value.filter(v => v !== itemValue)
      : value.concat(itemValue);

    onChange?.(newValue);
    setValue(newValue);
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

  const renderItems = () => {
    if (items.length === 0) return null;

    const labelVariant = {
      lg: "body1",
      md: "body1",
      sm: "body2",
    }[size] as TextProps["variant"];

    return items.map(item => {
      const checkId = `CheckGroup:CheckBox_${nodeId}_${item.value}`;
      const checkKey = item.value + item.label;
      const isChecked = value.includes(item.value);

      return (
        <div
          key={checkKey}
          className={cn(classes["control"], {
            [classes["checked"]!]: isChecked,
          })}
        >
          <CheckBox
            hideLabel
            name={name}
            id={checkId}
            label={item.label}
            value={item.value}
            checked={isChecked}
            disabled={disabled}
            readOnly={readOnly}
            size={size}
            className={classes["checkbox"]}
            onChange={() => handleChange(!isChecked, item.value)}
          />
          <Text
            as="label"
            htmlFor={checkId}
            variant={labelVariant}
            className={classes["checkbox-label"]}
          >
            {item.label}
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
      <div
        {...otherProps}
        id={groupId}
        inert={disabled}
        role="group"
        aria-orientation={orientation}
        aria-readonly={readOnly}
        aria-disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={classes["group"]}
      >
        {renderItems()}
      </div>
      {renderFeedback()}
    </div>
  );
};
