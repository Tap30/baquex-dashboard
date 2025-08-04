import type { ComboBoxGroup, ComboBoxItem } from "./ComboBox.tsx";

export const isGroup = (item: ComboBoxItem): item is ComboBoxGroup => {
  return "items" in item && item.type === "group";
};

export const normalizeValues = (value: string | string[]) => {
  if (value == null) return [];

  if (typeof value === "string") {
    if (value.length === 0) return [];

    return [value];
  }

  return value;
};

export const noValueSelected = (value: string | string[]) =>
  normalizeValues(value).length === 0;
