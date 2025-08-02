import { Icon, IconButton, SelectInput } from "@/components";
import { strings } from "@/static-content";
import { cn, useControllableProp } from "@/utils";
import { mdiChevronDown, mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import {
  type DateRange,
  type DayPickerProps,
  type DropdownProps,
  getDefaultClassNames,
} from "react-day-picker";
import { DayPicker, faIR } from "react-day-picker/persian";
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

export const Calendar = (props: CalendarProps) => {
  const {
    className,
    formatters,
    components,
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

  const handleChange: OnSelectHandler<DateRange> = value => {
    if (disabled || readOnly) return;

    if (!value) return;

    if (mode === "single") {
      onChange?.([value]);
      setValue([value]);
    } else if (mode === "range") {
      onChange?.(value);
      setValue(value);
    } else if (mode === "multiple") {
      onChange?.(value);
      setValue(value);
    }
  };

  return (
    <DayPicker
      selected={value}
      disabled={disabled}
      locale={faIR}
      // OnSelectHandler={console.log}
      onDaySelect={handleChange}
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
              size="sm"
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
              icon={<Icon data={mdiChevronRight} />}
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
        Chevron: ({ orientation }) => {
          if (orientation === "left") {
            return <Icon data={mdiChevronLeft} />;
          }

          return <Icon data={mdiChevronDown} />;
        },
        ...components,
      }}
      {...otherProps}
    />
  );
};
