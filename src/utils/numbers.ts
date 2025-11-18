import appConfig from "@config";
import { Languages } from "@constants/languages";

export const formatNumber = (
  n: number,
  options: Intl.NumberFormatOptions = {},
): string => {
  const {
    useGrouping = false,
    maximumFractionDigits = 2,
    ...otherOpts
  } = options;

  const { language } = appConfig;

  const formatter = new Intl.NumberFormat(
    language === Languages.FA ? "fa-IR" : "en-US",
    {
      ...otherOpts,
      useGrouping,
      maximumFractionDigits,
    },
  );

  return formatter.format(n);
};

export const normalizeNumbers = (input: string): number => {
  if (typeof input !== "string") {
    return NaN;
  }

  let normalizedString = input.trim();

  const persianDigits = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  } as Record<string, string>;

  normalizedString = input.replace(/[۰-۹]/g, char => persianDigits[char] ?? "");

  const parsedNumber = Number(normalizedString);

  return Number.isNaN(parsedNumber) ? NaN : parsedNumber;
};
