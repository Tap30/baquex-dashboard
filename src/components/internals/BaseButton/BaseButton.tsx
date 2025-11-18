import { strings } from "@static-content";
import type { PolymorphicPropsWithOmitted, WithBaseProps } from "@types";
import { cn } from "@utils/cn";
import { useForkedRefs } from "@utils/use-forked-refs";
import { useIsomorphicLayoutEffect } from "@utils/use-isomorphic-layout-effect";
import { useRef } from "react";
import classes from "./styles.module.css";

export type BaseButtonProps<
  E extends React.ElementType = "button",
  OmittedKeys extends keyof React.ComponentPropsWithRef<E> = never,
> = PolymorphicPropsWithOmitted<
  E,
  OmittedKeys,
  WithBaseProps<{
    /**
     * The classnames of the component.
     */
    classNames?: Partial<Record<"wrapper" | "root" | "focusAnchor", string>>;

    /**
     * The props attached to the wrapper element.
     */
    wrapperProps?: Omit<
      React.ComponentPropsWithRef<"div">,
      "className" | "children"
    >;

    /**
     * The visual style variant of the button.
     *
     * @default "filled"
     */
    variant?: "filled" | "outlined" | "ghost";

    /**
     * The color scheme of the button.
     *
     * @default "neutral"
     */
    color?: "neutral" | "brand" | "positive" | "negative" | "warn" | "info";

    /**
     * The size of the button.
     *
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * If true, the button will be disabled and non-interactive.
     *
     * @default false
     */
    disabled?: boolean;

    /**
     * If true, a loading indicator will be displayed inside the button.
     *
     * @default false
     */
    pending?: boolean;

    /**
     * Whether to make the button fluid.
     *
     * @default false;
     */
    fluid?: boolean;
  }>
>;

export const BaseButton = <E extends React.ElementType = "button">(
  props: BaseButtonProps<E>,
): React.ReactNode => {
  const {
    as: Root = "button",
    ref,
    children,
    className,
    classNames,
    style,
    wrapperProps,
    color = "neutral",
    disabled = false,
    pending = false,
    fluid = false,
    size = "md",
    variant = "filled",
    tabIndex: tabIndexProp,
    ...otherProps
  } = props;

  const rootRef = useRef<HTMLButtonElement | null>(null);
  const focusAnchorRef = useRef<HTMLDivElement | null>(null);

  const handleRootRef = useForkedRefs(ref, rootRef);

  useIsomorphicLayoutEffect(() => {
    const currentActiveElement = document.activeElement;
    const btnElement = rootRef.current;
    const focusAnchorElement = focusAnchorRef.current;

    if (!currentActiveElement || !btnElement || !focusAnchorElement) return;

    if (pending) {
      if (currentActiveElement !== btnElement) return;

      focusAnchorElement.focus();
    } else {
      if (currentActiveElement !== focusAnchorElement) return;

      btnElement.focus();
    }
  }, [pending]);

  const isButtonDisabled = disabled || pending;

  const buttonTabIndex = disabled ? -1 : pending ? -1 : (tabIndexProp ?? 0);
  const focusAnchorTabIndex = pending ? 0 : -1;

  const role = Root === "button" || Root === "a" ? undefined : "button";

  const disabledProps =
    role === "button"
      ? { disabled: isButtonDisabled }
      : { "aria-disabled": isButtonDisabled };

  return (
    <div
      {...wrapperProps}
      style={style}
      className={cn(classes["wrapper"], className, classNames?.wrapper)}
      data-size={size}
      data-variant={variant}
      data-color={color}
      data-disabled={isButtonDisabled}
      data-pending={pending}
      data-fluid={fluid}
    >
      <div
        ref={focusAnchorRef}
        role="button"
        aria-label={strings.components.button.pending}
        aria-disabled="true"
        tabIndex={focusAnchorTabIndex}
        className={cn(classes["focus-anchor"], classNames?.focusAnchor)}
      ></div>
      <Root
        {...otherProps}
        {...disabledProps}
        role={role}
        inert={isButtonDisabled}
        tabIndex={buttonTabIndex}
        ref={handleRootRef}
        className={cn(
          classes["root"],
          classes[color],
          classes[variant],
          classes[size],
          classNames?.root,
          {
            [classes["disabled"]!]: isButtonDisabled,
            [classes["fluid"]!]: fluid,
          },
        )}
      >
        {children}
      </Root>
    </div>
  );
};
