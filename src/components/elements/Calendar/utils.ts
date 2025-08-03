import { lazy } from "react";
import { CalendarLocale, CalendarType } from "./constants.ts";

export const resolveCalendar = (
  type: (typeof CalendarType)[keyof typeof CalendarType],
) => {
  const DayPicker = lazy(async () => {
    if (type === CalendarType.GREGORIAN) {
      return { default: (await import("react-day-picker")).DayPicker };
    }

    return { default: (await import("react-day-picker/persian")).DayPicker };
  });

  const locale = CalendarLocale[type];

  return { DayPicker, locale };
};
