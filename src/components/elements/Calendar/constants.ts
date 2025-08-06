import { Languages } from "@/constants";
import { strings } from "@/static-content";
import { faIR as enFaIR, enUS, type Locale } from "date-fns/locale";
import {
  type DayPicker,
  DayPicker as GregorianDayPicker,
} from "react-day-picker";
import {
  enUS as faEnUS,
  faIR,
  DayPicker as JalaliDayPicker,
} from "react-day-picker/persian";

export const CalendarType = {
  GREGORIAN: "GREGORIAN",
  JALALI: "JALALI",
} as const;

export const CalendarLocale: Record<
  (typeof CalendarType)[keyof typeof CalendarType],
  Locale
> = {
  [CalendarType.JALALI]: strings.getLanguage() === Languages.EN ? faEnUS : faIR,
  [CalendarType.GREGORIAN]:
    strings.getLanguage() === Languages.EN ? enUS : enFaIR,
} as const;

export const CalendarInstance: Record<
  (typeof CalendarType)[keyof typeof CalendarType],
  typeof DayPicker
> = {
  [CalendarType.JALALI]: JalaliDayPicker as typeof DayPicker,
  [CalendarType.GREGORIAN]: GregorianDayPicker,
} as const;
