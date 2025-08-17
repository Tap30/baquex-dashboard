import { Icon } from "@components/Icon";
import { IconButton } from "@components/IconButton";
import { Text, type TextProps } from "@components/Text";
import { mdiClose } from "@mdi/js";
import { strings } from "@static-content";
import type { MergeElementProps } from "@types";
import { cn } from "@utils/cn";
import { formatNumber } from "@utils/numbers";
import { useForkedRefs } from "@utils/use-forked-refs";
import { useUniqueId } from "@utils/use-unique-id";
import { useEffect, useRef, useState } from "react";
import classes from "./styles.module.css";
import { arrayFromFileList } from "./utils.ts";

export type FileInputProps = Omit<
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
    }
  >,
  | "children"
  | "type"
  | "value"
  | "defaultValue"
  | "checked"
  | "defaultChecked"
  | "aria-invalid"
  | "aria-describedby"
  | "aria-label"
  | "aria-labelledby"
>;

export const FileInput: React.FC<FileInputProps> = props => {
  const {
    ref,
    className,
    id: idProp,
    startSlot,
    endSlot,
    label,
    description,
    errorText,
    feedback,
    placeholder,
    size = "md",
    multiple = false,
    autoFocus = false,
    hasError = false,
    hideLabel = false,
    disabled = false,
    readOnly = false,
    onChange,
    ...otherProps
  } = props;

  const nodeId = useUniqueId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleRef = useForkedRefs(ref, inputRef);

  const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const rootId = `FileInput:Root_${nodeId}`;
  const labelId = `FileInput:Label_${nodeId}`;
  const descId = `FileInput:Description_${nodeId}`;
  const inputId = idProp ?? `FileInput:Input_${nodeId}`;

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

  const handleClear: React.MouseEventHandler<HTMLButtonElement> = event => {
    if (disabled || readOnly) return;

    event.preventDefault();
    event.stopPropagation();

    const input = inputRef.current;

    if (input) {
      input.value = "";
      input.files = null;

      input.dispatchEvent(new Event("change", { bubbles: true }));
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }

    setSelectedFiles([]);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    if (disabled || readOnly) return;

    onChange?.(event);

    setSelectedFiles(arrayFromFileList(event.target.files));
  };

  const handleClick: React.MouseEventHandler = () => {
    if (disabled || readOnly) return;

    inputRef.current?.click();
  };

  const preventDragInteraction: React.DragEventHandler = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop: React.DragEventHandler = event => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.dataTransfer) return;

    const files = event.dataTransfer.files;

    if (!files || files.length === 0) return;
    if (!multiple && files.length > 1) return;

    const input = inputRef.current;

    if (!input) return;

    input.files = files;

    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.dispatchEvent(new Event("input", { bubbles: true }));
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
    const shouldRenderClear =
      !readOnly && !disabled && selectedFiles.length > 0;

    if (!endSlot && !shouldRenderClear) return null;

    return (
      <div className={classes["end-slot"]}>
        {shouldRenderClear && (
          <IconButton
            tabIndex={-1}
            aria-hidden
            size={size === "sm" ? "sm" : "md"}
            aria-label={strings.clearValue}
            icon={<Icon data={mdiClose} />}
            variant="ghost"
            onClick={handleClear}
          />
        )}
        {endSlot}
      </div>
    );
  };

  const ariaLabel = hideLabel ? label : undefined;
  const ariaDescribedBy = description ? descId : undefined;
  const ariaInvalid = hasError;

  const valueDisplay =
    selectedFiles.length === 0
      ? placeholder
      : selectedFiles.length === 1
        ? selectedFiles[0]!.name
        : strings.formatString(
            strings.components.fileInput.multipleSelected,
            formatNumber(selectedFiles.length),
          );

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
        className={classes["control"]}
        tabIndex={-1}
        onClick={handleClick}
        inert={disabled}
        onDragOver={preventDragInteraction}
        onDragEnd={preventDragInteraction}
        onDrop={handleDrop}
      >
        {renderStartSlot()}
        <div
          className={cn(classes["value-display"], {
            [classes["placeholder"]!]: selectedFiles.length === 0,
          })}
        >
          {valueDisplay}
        </div>
        <input
          {...otherProps}
          ref={handleRef}
          type="file"
          autoFocus={autoFocus}
          id={inputId}
          multiple={multiple}
          readOnly={readOnly}
          disabled={disabled}
          inert={disabled}
          aria-invalid={ariaInvalid}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          className={classes["input"]}
          onChange={handleChange}
        />
        {renderEndSlot()}
      </div>
      {renderFeedback()}
    </div>
  );
};
