import type { WithBaseProps } from "@/types";

export type FormControlProps = WithBaseProps<{
  /**
   * The label of the input.
   */
  label: string;

  /**
   * Whether to hide the label or not.
   *
   * @default false
   */
  hideLabel?: boolean;

  /**
   * The text to display as a description.
   */
  description?: string;

  /**
   * Conveys additional information below the text input, such as how it should
   * be used.
   */
  feedback?: string;

  /**
   * Gets or sets whether or not the text input is in a visually invalid state.
   *
   * This error state overrides the error state controlled by
   * `reportValidity()`.
   *
   * @default false
   */
  hasError?: boolean;

  /**
   * The error message that replaces feedback when `error` is true. If
   * `errorText` is an empty string, then the feedback will continue to
   * show.
   */
  errorText?: string;

  /**
   * The size of the input.
   *
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Indicates whether or not a user should be able to edit the text input's
   * value.
   *
   * @default false
   */
  readOnly?: boolean;

  /**
   * Whether or not the element is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Indicates that the element should be focused on mount.
   *
   * @default false
   */
  autoFocus?: boolean;
}>;
