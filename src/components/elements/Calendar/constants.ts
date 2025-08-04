import { Languages } from "@/constants";
import { strings } from "@/static-content";
import { faIR as enFaIR, enUS, type Locale } from "date-fns/locale";
import { enUS as faEnUS, faIR } from "react-day-picker/persian";

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
