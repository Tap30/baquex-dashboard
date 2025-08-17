import type { MergeElementProps, WithBaseProps } from "@types";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type ClickableAreaProps = MergeElementProps<
  "button",
  WithBaseProps<{
    /**
     * If true, the button will be disabled and non-interactive.
     *
     * @default false
     */
    disabled?: boolean;
  }>
>;

export const ClickableArea: React.FC<ClickableAreaProps> = props => {
  const {
    children,
    className,
    disabled = false,
    tabIndex: tabIndexProp,
    ...otherProps
  } = props;

  const tabIndex = disabled ? -1 : (tabIndexProp ?? 0);

  return (
    <button
      {...otherProps}
      inert={disabled}
      disabled={disabled}
      tabIndex={tabIndex}
      className={cn(classes["root"], className)}
    >
      {children}
    </button>
  );
};
