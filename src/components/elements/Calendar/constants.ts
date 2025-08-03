import { enUS, type Locale } from "date-fns/locale";
import { enUS as jalaliEn, faIR as jalaliFa } from "react-day-picker/persian";

export const CalendarType = {
  GREGORIAN: "GREGORIAN",
  JALALI_FA: "JALALI_FA",
  JALALI_EN: "JALALI_EN",
} as const;

export const CalendarLocale: Record<
  (typeof CalendarType)[keyof typeof CalendarType],
  Locale
> = {
  [CalendarType.JALALI_FA]: jalaliFa,
  [CalendarType.JALALI_EN]: jalaliEn,
  [CalendarType.GREGORIAN]: enUS,
} as const;
