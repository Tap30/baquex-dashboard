import { Icon, IconButton, SelectInput } from "@/components";
import { strings } from "@/static-content";
import { cn, useControllableProp } from "@/utils";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { faIR } from "date-fns/locale";
import {
  type DateRange,
  type DayPickerProps,
  type DropdownProps,
  getDefaultClassNames,
  type Locale,
  type OnSelectHandler,
} from "react-day-picker";
import { DayPicker } from "react-day-picker/persian";
import classes from "./styles.module.css";

export type CalendarValue = Date | Date[] | DateRange;

export type CalendarProps = Omit<
  DayPickerProps,
  "captionLayout" | "disabled"
> & {
  /**
   * The size of the input.
   *
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * The controlled value of the calendar.
   * Should be used in conjunction with `onChange`.
   */
  value?: CalendarValue;

  /**
   * The value of the select when initially rendered.
   * Use when you do not need to control the state of the calendar.
   */
  defaultValue?: CalendarValue;

  /**
   * Whether the calendar is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Indicates whether or not a user should be able to edit the date input's
   * value.
   *
   * @default false
   */
  readOnly?: boolean;

  /**
   *
   */
  onChange?: (value: CalendarValue) => void;
};

type ValueForMode<M extends "single" | "multiple" | "range"> =
  M extends "single"
    ? Date | undefined
    : M extends "multiple"
      ? Date[] | undefined
      : M extends "range"
        ? DateRange | undefined
        : never;

export const Calendar = <M extends "single" | "multiple" | "range">(
  props: CalendarProps & { mode: M; value?: ValueForMode<M> },
) => {
  const {
    className,
    formatters,
    onChange,
    defaultValue,
    disabled,
    readOnly,
    value: valueProp,
    mode = "single",
    size = "md",
    ...otherProps
  } = props;

  const [value, setValue] = useControllableProp<CalendarValue | null>({
    fallbackValue: null,
    controlledPropValue: valueProp,
    uncontrolledDefaultValueProp: defaultValue,
  });

  const defaultClassNames = getDefaultClassNames();

  const handleChange: OnSelectHandler<CalendarValue> = selected => {
    if (disabled || readOnly || !selected) return;

    if (mode === "single") {
      onChange?.(selected); // ✅ Just the date
      setValue(selected);
    } else if (mode === "range") {
      onChange?.(selected); // ✅ DateRange
      setValue(selected);
    } else if (mode === "multiple") {
      onChange?.(selected); // ✅ Date[]
      setValue(selected);
    }
  };

  function getSelectedValue(): ValueForMode<M> {
    if (!value) return undefined as ValueForMode<M>;

    if (mode === "single") {
      return !Array.isArray(value) && !("from" in value)
        ? (value as ValueForMode<M>)
        : (undefined as ValueForMode<M>);
    }

    if (mode === "range") {
      return "from" in (value as DateRange)
        ? (value as ValueForMode<M>)
        : (undefined as ValueForMode<M>);
    }

    if (mode === "multiple") {
      return (Array.isArray(value) ? value : [value]) as ValueForMode<M>;
    }

    return undefined as ValueForMode<M>;
  }

  return (
    <DayPicker
      selected={getSelectedValue()}
      disabled={disabled}
      locale={faIR as unknown as Locale}
      onSelect={handleChange}
      showOutsideDays
      mode={mode}
      className={cn(className)}
      captionLayout="dropdown"
      formatters={formatters}
      classNames={{
        months: cn(defaultClassNames.months, classes["months"]),
        month: cn(defaultClassNames.month, classes["month"]),
        nav: cn(defaultClassNames.nav, classes["nav"]),
        month_caption: cn(
          defaultClassNames.month_caption,
          classes["month-caption"],
        ),
        dropdown_root: cn(
          classes["dropdown-root"],
          defaultClassNames.dropdown_root,
        ),
        caption_label: cn(
          classes["caption-label"],
          defaultClassNames.caption_label,
        ),
        weekdays: cn(defaultClassNames.weekdays, classes["weekdays"]),
        weekday: cn(defaultClassNames.weekday, classes["weekday"]),
        week: cn(defaultClassNames.week, classes["week"]),
        week_number_header: cn(
          defaultClassNames.week_number_header,
          classes["week-number-header"],
        ),
        selected: cn(defaultClassNames.selected, {
          [classes["selected"]!]: mode !== "range",
        }),
        week_number: cn(defaultClassNames.week_number, classes["week-number"]),
        day: cn(defaultClassNames.day, classes["day"]),
        day_button: cn(classes["day-button"]),
        range_start: cn(classes["range-start"]),
        range_middle: cn(classes["range-middle"]),
        range_end: cn(classes["range-end"]),
        today: cn(classes["today"]),
        outside: cn(defaultClassNames.outside, classes["outside"]),
        disabled: cn(defaultClassNames.disabled, classes["disabled"]),
        hidden: cn(classes["hidden"], defaultClassNames.hidden),
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(classes["root"], classes[size], className)}
              {...props}
            />
          );
        },
        Dropdown: (props: DropdownProps) => {
          const { value, onChange, name, options = [] } = props;

          const items = options.map(option => ({
            label: option.label,
            value: option.value.toString(),
            disabled: option.disabled,
          }));

          const handleChange = (val: string) => {
            const syntheticEvent = {
              target: { value: val },
            } as React.ChangeEvent<HTMLSelectElement>;

            onChange?.(syntheticEvent);
          };

          const label =
            name === "month"
              ? strings.components.calendar.month
              : name === "year"
                ? strings.components.calendar.month
                : "";

          return (
            <SelectInput
              label={label}
              name={name}
              items={items}
              value={value?.toString() ?? ""}
              onChange={handleChange}
              size={size === "lg" ? "md" : "sm"}
              placeholder=""
              hideLabel
            />
          );
        },
        NextMonthButton: ({ onClick }) => {
          return (
            <IconButton
              disabled={!!disabled}
              variant="ghost"
              color="neutral"
              title={strings.components.calendar.previousMonth}
              icon={<Icon data={mdiChevronLeft} />}
              onClick={onClick}
            />
          );
        },
        PreviousMonthButton: ({ onClick }) => {
          return (
            <IconButton
              disabled={!!disabled}
              variant="ghost"
              color="neutral"
              title={strings.components.calendar.previousMonth}
              icon={<Icon data={mdiChevronRight} />}
              onClick={onClick}
            />
          );
        },
      }}
      {...otherProps}
    />
  );
};
