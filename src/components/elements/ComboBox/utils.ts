import type { ComboBoxGroup, ComboBoxItem } from "./ComboBox.tsx";

export const isGroup = (item: ComboBoxItem): item is ComboBoxGroup => {
  return "items" in item && item.type === "group";
};

export const normalizeValues = (value: string | string[]): string[] => {
  if (value == null) return [];

  if (typeof value === "string") {
    if (value.length === 0) return [];

    return [value];
  }

  return value;
};

export const getTitleMap = (items: ComboBoxItem[]): Map<string, string> => {
  const map = new Map<string, string>();

  items.forEach(item => {
    if (item.type === "option") {
      map.set(item.value, item.label);
    } else {
      item.items.forEach(item => {
        map.set(item.value, item.label);
      });
    }
  });

  return map;
};
