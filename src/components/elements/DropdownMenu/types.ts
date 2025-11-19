export type MenuSub = Omit<MenuNormalItem, "type" | "shortcut"> & {
  /**
   * The type of the item.
   */
  type: "sub";

  /**
   * The items of the sub menu.
   */
  items: MenuItem[];

  /**
   * The label of the sub menu.
   */
  label: string;
};

export type MenuRadioGroup = {
  /**
   * The type of the item.
   */
  type: "radio-group";

  /**
   * The label of the group.
   */
  label: string;

  /**
   * Whether to hide the label or not.
   *
   * @default false
   */
  hideLabel?: boolean;

  /**
   * The value of the selected item in the group.
   */
  value?: string;

  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: string) => void;

  /**
   * The radio group items.
   */
  radios: Array<
    Omit<MenuNormalItem, "type" | "icon"> & {
      /**
       * The unique value of the item.
       */
      value: string;
    }
  >;
};

export type MenuGroup = {
  /**
   * The type of the item.
   */
  type: "group";

  /**
   * The label of the group.
   */
  label: string;

  /**
   * Whether to hide the label or not.
   *
   * @default false
   */
  hideLabel?: boolean;

  /**
   * The group items.
   */
  items: Array<MenuSeparator | MenuNormalItem | MenuCheckboxItem>;
};

export type MenuSeparator = {
  /**
   * The type of the item.
   */
  type: "separator";
};

export type MenuNormalItem = {
  /**
   * The type of the item.
   */
  type: "item";

  /**
   * The text label of the item.
   */
  label: string;

  /**
   * The shortcut text of the item.
   */
  shortcut?: string;

  /**
   * The icon of the item.
   */
  icon?: React.ReactNode;

  /**
   * When `true`, prevents the user from interacting with the item.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Event handler called when the user selects an item (via mouse or keyboard).
   * Calling `event.preventDefault` in this handler will prevent the dropdown
   * menu from closing when selecting that item.
   */
  onSelect?: (event: Event) => void;
};

export type MenuCheckboxItem = Omit<MenuNormalItem, "type" | "icon"> & {
  /**
   * The type of the item.
   */
  type: "checkbox-item";

  /**
   * The controlled checked state of the item.
   * Must be used in conjunction with `onCheckedChange`.
   */
  checked?: boolean;

  /**
   * Event handler called when the checked state changes.
   */
  onCheckedChange?: (checked: boolean) => void;
};

export type MenuItem =
  | MenuSeparator
  | MenuNormalItem
  | MenuCheckboxItem
  | MenuGroup
  | MenuRadioGroup
  | MenuSub;
