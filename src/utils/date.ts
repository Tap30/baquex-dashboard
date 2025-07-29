import { Languages } from "@/constants";
import { strings } from "@/static-content";

export const formatDate = (date: Date): string => {
  const lang = strings.getLanguage();

  const formatter = new Intl.DateTimeFormat(
    lang === Languages.FA ? "fa-IR" : "en-US",
  );

  return formatter.format(date);
};
