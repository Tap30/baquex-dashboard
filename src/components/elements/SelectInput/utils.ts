import type { SelectGroup, SelectItem } from "./SelectInput.tsx";

export const isGroup = (item: SelectItem): item is SelectGroup => {
  return "items" in item && Array.isArray(item.items);
};
