import {
  CalendarFormatter,
  CalendarInstance,
  CalendarLocale,
  type CalendarType,
} from "./constants.ts";

export const resolveCalendar = (
  type: (typeof CalendarType)[keyof typeof CalendarType],
) => {
  const locale = CalendarLocale[type];
  const DayPicker = CalendarInstance[type];
  const format = CalendarFormatter[type];

  return { DayPicker, locale, format };
};
