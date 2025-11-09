import { strings } from "@static-content";
import { formatDateTime } from "@utils/date";
import type { DateRange } from "react-day-picker";

export const getValueDisplay = (
  value: Date | Date[] | DateRange | null,
  dateFormatter: (date: Date) => string = date =>
    formatDateTime(date, { dateStyle: "medium" }),
) => {
  let display = "";

  if (!value) return display;

  if (value instanceof Date) {
    display = dateFormatter(value);
  } else if (Array.isArray(value)) {
    display = value.map(dateFormatter).join(`${strings.comma} `);
  } else {
    if (!value.from) display = "";
    else {
      display = `${dateFormatter(value.from)} - ${dateFormatter(value.to ?? value.from)}`;
    }
  }

  return display;
};
