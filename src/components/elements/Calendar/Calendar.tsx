import { ComboBox, type ComboBoxItem } from "@components/ComboBox";
import { Icon } from "@components/Icon";
import { IconButton } from "@components/IconButton";
import { useDirection } from "@contexts/Direction";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { strings } from "@static-content";
import { type Overwrite } from "@types";
import { cn } from "@utils/cn";
import { formatNumber, normalizeNumbers } from "@utils/numbers";
import { useMemo } from "react";
import {
  getDefaultClassNames,
  type DayPickerProps,
  type DropdownProps,
  type Mode,
  type PropsMultiRequired,
  type PropsRangeRequired,
  type PropsSingleRequired,
} from "react-day-picker";
import { CalendarType } from "./constants.ts";
import classes from "./styles.module.css";
import { resolveCalendar } from "./utils.ts";

export type CalendarProps<M extends Mode> = Overwrite<
  Omit<
    DayPickerProps,
    | "captionLayout"
    | "required"
    | "modifiersStyles"
    | "animate"
    | "classNames"
    | "dir"
    | "components"
    | "locale"
    | "style"
    | "styles"
    | "lang"
    | "showOutsideDays"
  >,
  {
    /**
     * Enable the selection of a single day, multiple days, or a range of days.
     *
     * @see https://daypicker.dev/docs/selection-modes
     */
    mode: M;

    /**
     * Whether to render the calendar with full width.
     *
     * @default false
     */
    fullWidth?: boolean;

    /**
     * The calendar type.
     *
     * @default "jalali"
     */
    type?: (typeof CalendarType)[keyof typeof CalendarType];
  } & (
    | Omit<PropsMultiRequired, "required">
    | Omit<PropsRangeRequired, "required">
    | Omit<PropsSingleRequired, "required">
  )
>;

const defaultClassNames = getDefaultClassNames();

export const Calendar = <M extends Mode>(props: CalendarProps<M>) => {
  const {
    className,
    formatters: formattersProp,
    type = CalendarType.JALALI,
    today: todayProp,
    fullWidth = false,
    ...otherProps
  } = props as CalendarProps<"single">;

  const today = todayProp ?? new Date();
  const dir = useDirection();

  const { DayPicker, locale, format } = useMemo(
    () => resolveCalendar(type),
    [type],
  );

  const formatters = useMemo<DayPickerProps["formatters"]>(
    () => ({
      formatWeekdayName: (weekday, options) =>
        format(weekday, "EEEE", options)[0] || "",
      formatDay: date => {
        return formatNumber(parseInt(format(date, "d")));
      },
      formatYearDropdown: (year, dateLib) => {
        return formatNumber(
          normalizeNumbers(dateLib?.format(year, "yyyy") || ""),
        );
      },
      ...formattersProp,
    }),

    [formattersProp, format],
  );

  const classNames = useMemo<DayPickerProps["classNames"]>(
    () => ({
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
      weekdays: cn(defaultClassNames.weekdays, classes["weekdays"]),
      weekday: cn(defaultClassNames.weekday, classes["weekday"]),
      week: cn(defaultClassNames.week, classes["week"]),
      week_number_header: cn(
        defaultClassNames.week_number_header,
        classes["week-number-header"],
      ),
      selected: cn(defaultClassNames.selected, {
        [classes["selected"]!]: (otherProps.mode as M) !== "range",
      }),
      week_number: cn(defaultClassNames.week_number, classes["week-number"]),
      day: cn(defaultClassNames.day, classes["day"]),
      month_grid: cn(defaultClassNames.month_grid, classes["month-grid"]),
      day_button: cn(classes["day-button"]),
      range_start: cn(classes["range-start"]),
      range_middle: cn(classes["range-middle"]),
      range_end: cn(classes["range-end"]),
      today: cn(classes["today"]),
      outside: cn(defaultClassNames.outside, classes["outside"]),
      disabled: cn(defaultClassNames.disabled, classes["disabled"]),
      hidden: cn(classes["hidden"], defaultClassNames.hidden),
      dropdowns: cn(defaultClassNames.dropdowns, classes["dropdowns"]),
    }),
    [otherProps.mode],
  );

  const components = useMemo<DayPickerProps["components"]>(
    () => ({
      Root: ({ className, rootRef, ...props }) => {
        return (
          <div
            {...props}
            ref={rootRef}
            className={cn(classes["root"], className, {
              [classes["full-width"]!]: fullWidth,
            })}
          />
        );
      },
      Dropdown: (props: DropdownProps) => {
        const { value, onChange, name, options = [] } = props;

        const items = options.map(option => ({
          label: option.label,
          value: option.value.toString(),
          disabled: option.disabled,
          type: "option",
        })) as ComboBoxItem[];

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
              ? strings.components.calendar.year
              : "";

        return (
          <ComboBox
            label={label}
            name={name}
            selectMode="single"
            items={items}
            value={value?.toString() ?? ""}
            onChange={handleChange}
            hideLabel
            clearable={false}
            searchable={false}
          />
        );
      },
      NextMonthButton: props => {
        return (
          <IconButton
            {...props}
            variant="ghost"
            color="neutral"
            title={strings.components.calendar.previousMonth}
            icon={
              <Icon data={dir === "rtl" ? mdiChevronLeft : mdiChevronRight} />
            }
          />
        );
      },
      PreviousMonthButton: props => {
        return (
          <IconButton
            {...props}
            variant="ghost"
            color="neutral"
            title={strings.components.calendar.previousMonth}
            icon={
              <Icon data={dir === "rtl" ? mdiChevronRight : mdiChevronLeft} />
            }
          />
        );
      },
    }),
    [dir, fullWidth],
  );

  return (
    <DayPicker
      {...otherProps}
      locale={locale}
      dir={dir}
      today={today}
      required
      showOutsideDays
      className={cn(className)}
      captionLayout="dropdown"
      formatters={formatters}
      classNames={classNames}
      components={components}
    />
  );
};
