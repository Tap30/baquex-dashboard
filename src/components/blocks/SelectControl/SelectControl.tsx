import { Text, type TextProps } from "@components/Text";
import type { MergeElementProps } from "@types";
import { cn } from "@utils/cn";
import { useControllableProp } from "@utils/use-controllable-prop";
import { useGetLatest } from "@utils/use-get-latest";
import { useUniqueId } from "@utils/use-unique-id";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SelectControlContext } from "./Context.ts";
import classes from "./styles.module.css";

export type SelectControlRenderProps = {
  isSelected: (itemIdentifier: string) => boolean;
  select: (itemIdentifier: string) => void;
  role: "radio" | "checkbox";
} & Required<
  Pick<
    SelectControlProps,
    "disabled" | "readOnly" | "required" | "hasError" | "size"
  >
>;

export type SelectControlProps = Omit<
  MergeElementProps<
    "div",
    {
      className?: string;
      classNames?: Partial<
        Record<"root" | "group" | "label" | "description" | "feedback", string>
      >;
      children?: React.ReactNode;
      toggleable?: boolean;
      disabled?: boolean;
      readOnly?: boolean;
      required?: boolean;
      hasError?: boolean;
      name?: string;
      label: string;
      description?: string;
      feedback?: string;
      errorText?: string;
      size?: "sm" | "md" | "lg";
      hideLabel?: boolean;
    } & (
      | {
          selectMode: "multiple";
          value?: string[];
          defaultValue?: string[];
          onChange?: (value: string[]) => void;
        }
      | {
          selectMode: "single";
          value?: string;
          defaultValue?: string;
          onChange?: (value: string) => void;
        }
    )
  >,
  | "checked"
  | "defaultChecked"
  | "aria-disabled"
  | "aria-readonly"
  | "aria-invalid"
  | "aria-label"
  | "aria-labelledby"
>;

export const SelectControl: React.FC<SelectControlProps> = props => {
  const {
    label,
    ref,
    name,
    id: idProp,
    classNames,
    className,
    children,
    description,
    feedback,
    errorText,
    size = "md",
    required = false,
    hasError = false,
    hideLabel = false,
    readOnly = false,
    disabled = false,
    toggleable = false,
    selectMode,
    value: valueProp,
    defaultValue,
    onChange,
  } = props;

  const { current: isSingleSelect } = useRef(selectMode === "single");

  const role: SelectControlRenderProps["role"] = isSingleSelect
    ? "radio"
    : "checkbox";

  const nodeId = useUniqueId();

  const rootId = idProp ?? `SelectControl:Root_${nodeId}`;
  const groupId = `SelectControl:Group_${nodeId}`;
  const labelId = `SelectControl:Label_${nodeId}`;
  const descId = `SelectControl:Description_${nodeId}`;

  const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);

  const getOnChange = useGetLatest(onChange);

  const [value, setValue] = useControllableProp({
    controlledPropValue: valueProp,
    uncontrolledDefaultValueProp: defaultValue,
    fallbackValue: isSingleSelect ? "" : [],
  });

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

  const isSelected: SelectControlRenderProps["isSelected"] = useCallback(
    itemIdentifier => {
      if (isSingleSelect) return (value as string) === itemIdentifier;

      return (value as string[]).includes(itemIdentifier);
    },
    [isSingleSelect, value],
  );

  const select: SelectControlRenderProps["select"] = useCallback(
    itemIdentifier => {
      if (disabled || readOnly) return;

      const onChange = getOnChange();

      setValue(prevValue => {
        if (isSingleSelect) {
          let newValue: string;

          if (prevValue === itemIdentifier) {
            newValue = toggleable ? "" : prevValue;
          } else {
            newValue = itemIdentifier;
          }

          onChange?.(newValue as string & string[]);

          return newValue;
        }

        const idx = (prevValue as string[]).findIndex(
          v => v === itemIdentifier,
        );

        const newValue: string[] = [...prevValue];

        if (idx !== -1 && toggleable) {
          newValue.splice(idx, 1);
        } else {
          newValue.push(itemIdentifier);
        }

        onChange?.(newValue as string & string[]);

        return newValue;
      });
    },
    [disabled, getOnChange, isSingleSelect, readOnly, setValue, toggleable],
  );

  const renderLabel = () => {
    if (hideLabel) return null;

    const labelVariant = {
      lg: "subheading1",
      md: "subheading1",
      sm: "subheading2",
    }[size] as TextProps["variant"];

    return (
      <Text
        as="strong"
        id={labelId}
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

  const renderHiddenInput = () => {
    if (!name) return null;

    const renderOptions = () => {
      if (selectMode === "single") return <option value={value as string} />;

      return (value as string[]).map(value => (
        <option
          key={value}
          value={value}
        />
      ));
    };

    return (
      <select
        inert
        onFocus={e => void (e.preventDefault(), e.stopPropagation())}
        onChange={() => void 0}
        className="sr-only"
        aria-hidden
        required={required}
        tabIndex={-1}
        multiple={selectMode === "multiple"}
        disabled={disabled}
        value={value}
        name={name}
      >
        {renderOptions()}
      </select>
    );
  };

  const renderProps: SelectControlRenderProps = useMemo(
    () =>
      ({
        isSelected,
        select,
        disabled,
        hasError,
        readOnly,
        required,
        size,
        role,
      }) satisfies SelectControlRenderProps,
    [isSelected, select, disabled, hasError, readOnly, required, size, role],
  );

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
      data-select-mode={selectMode}
    >
      {renderHiddenInput()}
      {renderLabel()}
      {renderDescription()}
      <div
        id={groupId}
        inert={disabled}
        role="group"
        ref={ref}
        className={cn(classes["group"], classNames?.["group"])}
        aria-readonly={readOnly}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
      >
        <SelectControlContext.Provider value={renderProps}>
          {children}
        </SelectControlContext.Provider>
      </div>
      {renderFeedback()}
    </div>
  );
};
