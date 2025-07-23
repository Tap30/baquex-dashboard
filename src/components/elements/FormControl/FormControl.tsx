import { cn } from "@/utils";
import { useEffect, useId, useMemo, useState } from "react";
import { Text, type TextProps } from "../Text/index.ts";
import type { FormControlContextValue } from "./context/Context.ts";
import { FormControlProvider } from "./context/Provider.tsx";
import classes from "./styles.module.css";
import type { FormControlProps } from "./types.ts";

export const FormControl: React.FC<FormControlProps> = props => {
  const {
    className,
    label,
    description,
    errorText,
    feedback,
    children,
    size = "md",
    autoFocus = false,
    hasError = false,
    hideLabel = false,
    disabled = false,
    readOnly = false,
  } = props;

  const id = useId();

  const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);
  const [controlId, setControlId] = useState(`CONTROL_${id}`);

  const formControlId = `FORMCONTROL_${id}`;
  const labelId = `LABEL_${id}`;
  const descriptionId = `DESCRIPTION_${id}`;

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
        htmlFor={controlId}
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
        id={descriptionId}
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

  const context = useMemo(
    () =>
      ({
        size,
        autoFocus,
        formControlId,
        labelId,
        descriptionId,
        disabled,
        readOnly,
        hasError,
        controlId,
        setControlId,
        ariaLabel: hideLabel ? label : undefined,
        ariaDescribedBy: description ? descriptionId : undefined,
        ariaInvalid: hasError,
      }) satisfies FormControlContextValue,
    [
      size,
      autoFocus,
      controlId,
      formControlId,
      labelId,
      descriptionId,
      disabled,
      readOnly,
      hasError,
      hideLabel,
      label,
      description,
    ],
  );

  return (
    <div
      id={formControlId}
      className={cn(classes["root"], classes[size], className, {
        [classes["has-error"]!]: hasError,
        [classes["disabled"]!]: disabled,
      })}
    >
      {renderLabel()}
      {renderDescription()}
      <FormControlProvider context={context}>{children}</FormControlProvider>
      {renderFeedback()}
    </div>
  );
};
