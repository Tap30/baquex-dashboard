import { Languages } from "@constants/languages";
import { strings } from "@static-content";

export const formatNumber = (n: number): string => {
  const lang = strings.getLanguage();

  const formatter = new Intl.NumberFormat(
    lang === Languages.FA ? "fa-IR" : "en-US",
    { useGrouping: false },
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
