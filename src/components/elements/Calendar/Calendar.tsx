import { Icon, IconButton, SelectInput } from "@/components";
import { strings } from "@/static-content";
import { cn } from "@/utils";
import { mdiChevronDown, mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { getDefaultClassNames, type DayPickerProps } from "react-day-picker";
import { DayPicker, faIR } from "react-day-picker/persian";
import classes from "./styles.module.css";

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
   * Whether the calendar is disabled.
   *
   * @default false
   */
  disabled?: boolean;
};

export const Calendar = (props: CalendarProps) => {
  const {
    className,
    formatters,
    components,
    disabled,
    mode = "single",
    size = "md",
    ...otherProps
  } = props;

  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      disabled={disabled}
      locale={faIR}
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
        MonthsDropdown: ({ options = [], size: dropdownSize, ...props }) => {
          const items = options.map(option => ({
            label: option.label,
            value: option.value.toString(),
            disabled: option.disabled,
          }));

          return (
            <SelectInput
              disabled={disabled}
              label={strings.components.calendar.month}
              size={!Number.isNaN(dropdownSize) ? "md" : size}
              hideLabel
              items={items}
              {...props}
            />
          );
        },
        YearsDropdown: ({
          options = [],
          size: dropdownSize,
          onSelect,
          ...props
        }) => {
          const items = options.map(option => ({
            label: option.label,
            value: option.value.toString(),
            disabled: option.disabled,
          }));

          return (
            <SelectInput
              disabled={disabled}
              label={strings.components.calendar.year}
              size={!Number.isNaN(dropdownSize) ? "md" : size}
              hideLabel
              items={items}
              {...props}
            />
          );
        },
        NextMonthButton: ({ children, color, ...restProps }) => {
          return (
            <IconButton
              disabled={!!disabled}
              variant="ghost"
              color="neutral"
              title={strings.components.calendar.nextMonth}
              icon={<Icon data={mdiChevronLeft} />}
              {...restProps}
            />
          );
        },
        PreviousMonthButton: ({
          children,
          color = "neutral",
          ...restProps
        }) => {
          return (
            <IconButton
              disabled={!!disabled}
              variant="ghost"
              color={color}
              title={strings.components.calendar.previousMonth}
              icon={<Icon data={mdiChevronRight} />}
              {...restProps}
            />
          );
        },
        Chevron: ({ orientation }) => {
          if (orientation === "left") {
            return <Icon data={mdiChevronLeft} />;
          }

          if (orientation === "right") {
            return <Icon data={mdiChevronRight} />;
          }

          return <Icon data={mdiChevronDown} />;
        },
        ...components,
      }}
      {...otherProps}
    />
  );
};
