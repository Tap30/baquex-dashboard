import { Languages } from "@/constants";
import { strings } from "@/static-content";

export const formatNumber = (n: number): string => {
  const lang = strings.getLanguage();

  const formatter = new Intl.NumberFormat(
    lang === Languages.FA ? "fa-IR" : "en-US",
  );

  return formatter.format(n);
};
