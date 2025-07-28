import { Icon, IconButton, Spinner } from "@/components";
import { cn } from "@/utils";
import { mdiChevronDown, mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { Suspense } from "react";
import { getDefaultClassNames, type DayPickerProps } from "react-day-picker";
import { DayPicker } from "react-day-picker/persian";
// import type { DayPickerProps as JalaliProps } from "react-day-picker/persian";
import { strings } from "@/static-content";
import classes from "./styles.module.css";

export type CalendarProps = Omit<
  DayPickerProps,
  "showOutsideDays" | "captionLayout"
>;

export const Calendar = (props: CalendarProps) => {
  const { className, formatters, components, mode, ...otherProps } = props;

  const defaultClassNames = getDefaultClassNames();

  return (
    <Suspense fallback={<Spinner />}>
      <DayPicker
        showOutsideDays
        mode={mode}
        className={cn(
          "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
          String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
          String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
          className,
        )}
        captionLayout="dropdown"
        formatters={{
          formatMonthDropdown: date =>
            date.toLocaleString("default", { month: "short" }),
          ...formatters,
        }}
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
            "select-none font-medium",
            "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
            defaultClassNames.caption_label,
          ),
          // table: "w-full border-collapse",
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
          week_number: cn(
            defaultClassNames.week_number,
            classes["week-number"],
          ),
          day_button: cn(classes["day-button"]),
          // day: cn(
          //   // "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          //   // defaultClassNames.day,
          //   classes["day"],
          // ),
          range_start: cn(
            // "rounded-l-md bg-accent",
            // defaultClassNames.range_start,
            classes["range-start"],
          ),
          range_middle: cn(
            // "rounded-none",
            // defaultClassNames.range_middle,
            classes["range-middle"],
          ),
          range_end: cn(
            // "rounded-r-md bg-accent",
            // defaultClassNames.range_end,
            classes["range-end"],
          ),
          today: cn(
            // "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
            // defaultClassNames.today,
            classes["today"],
          ),
          outside: cn(defaultClassNames.outside, classes["outside"]),
          // "text-muted-foreground aria-selected:text-muted-foreground",
          // defaultClassNames.outside,
          disabled: cn(
            "text-muted-foreground opacity-50",
            defaultClassNames.disabled,
          ),
          hidden: cn("invisible", defaultClassNames.hidden),
          // ...classNames,
        }}
        components={{
          Root: ({ className, rootRef, ...props }) => {
            return (
              <div
                data-slot="calendar"
                ref={rootRef}
                className={cn(classes["root"], className)}
                {...props}
              />
            );
          },
          NextMonthButton: ({ children, color, ...restProps }) => {
            return (
              <IconButton
                variant="ghost"
                color="neutral"
                title={strings.components.calendar.nextMonth}
                icon={<Icon data={mdiChevronLeft} />}
                {...restProps}
              />
            );
          },
          PreviousMonthButton: ({ children, color, ...restProps }) => {
            return (
              <IconButton
                variant="ghost"
                color="neutral"
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
          // DayButton: CalendarDayButton,
          // WeekNumber: ({ children, ...props }) => {
          //   return (
          //     <td {...props}>
          //       <div className={classes["week-number"]}>
          //         {/* <div className="flex size-(--cell-size) items-center justify-center text-center"> */}
          //         {children}
          //       </div>
          //     </td>
          //   );
          // },
          ...components,
        }}
        {...otherProps}
      />
    </Suspense>
  );
};
