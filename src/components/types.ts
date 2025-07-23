export type WithColorProps<P extends object> = P & {
  /**
   * The color of the content.
   *
   * @default "currentcolor"
   */
  color?:
    | "currentcolor"
    | "normal"
    | "secondary"
    | "tertiary"
    | "muted"
    | "brand"
    | "brand-secondary"
    | "brand-tertiary"
    | "brand-muted"
    | "positive"
    | "positive-secondary"
    | "positive-tertiary"
    | "positive-muted"
    | "negative"
    | "negative-secondary"
    | "negative-tertiary"
    | "negative-muted"
    | "warn"
    | "warn-secondary"
    | "warn-tertiary"
    | "warn-muted"
    | "info"
    | "info-secondary"
    | "info-tertiary"
    | "info-muted"
    | "on-neutral"
    | "on-brand"
    | "on-positive"
    | "on-negative"
    | "on-warn"
    | "on-info";
};
