import appConfig from "@config";
import { Languages } from "@constants/languages";
import { formatDate as dateFormatter } from "date-fns-jalali";
import { faIR } from "date-fns/locale";

export const formatDate = (
  date: Date,
  formatStr = "yyyy/MM/dd HH:mm",
): string => {
  return dateFormatter(date, formatStr, { locale: faIR });
};

export const formatAsSerializableTimestamp = (date: Date): string => {
  return BigInt(date.getTime()).toString();
};

export const formatDateTime = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {},
): string => {
  const { language } = appConfig;

  const { hour12 = false, calendar = "persian", ...otherOpts } = options;

  const formatter = new Intl.DateTimeFormat(
    language === Languages.FA ? "fa-IR" : "en-US",
    {
      ...otherOpts,
      calendar,
      hour12,
    },
  );

  const formatted = formatter.format(date);
  const withoutEra = formatted.replace(/\s*(AP|AH|AD|CE|BC|BCE|BE)\s*/g, "");

  return withoutEra;
};
