import { strings } from "@/static-content";
import type { MergeElementProps, WithBaseProps } from "@/types";
import { cn, useForkedRefs, useIsomorphicLayoutEffect } from "@/utils";
import { useRef } from "react";
import classes from "./styles.module.css";

export type BaseButtonProps = MergeElementProps<
  "button",
  WithBaseProps<{
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
     * The URL to navigate to when the button is clicked.
     * If provided, the button will behave like a link.
     */
    href?: string;

    /**
     * The filename to use when downloading the linked resource.
     * If not specified, the browser will determine a filename.
     * This is only applicable when the button is used as a link (`href` is set).
     */
    download?: string;

    /**
     * Where to display the linked `href` URL for a link button. Common options include
     * `_blank` to open in a new tab. When the `target` is set to `_blank`, the `rel` attribute
     * of the anchor tag will automatically be set to `"noopener noreferrer"` to enhance
     * security and prevent potential tab exploitation.
     */
    target?: "_blank" | "_parent" | "_self" | "_top";
  }>
>;

export const BaseButton: React.FC<BaseButtonProps> = (
  props,
): React.ReactNode => {
  const {
    ref,
    href,
    download,
    target,
    children,
    className,
    style,
    color = "neutral",
    disabled = false,
    pending = false,
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

  const isLink = typeof href === "string";
  const ElementTag = (isLink ? "a" : "button") as "button";
  const rel = isLink && target === "_blank" ? "noopener noreferrer" : undefined;

  const isButtonDisabled = disabled || pending;

  const anchorProps = {
    "aria-disabled": isButtonDisabled,
    href,
    download,
    target,
    rel,
  };

  const buttonProps = {
    disabled: isButtonDisabled,
  };

  const buttonTabIndex = disabled ? -1 : pending ? -1 : (tabIndexProp ?? 0);
  const focusAnchorTabIndex = pending ? 0 : -1;

  return (
    <div
      style={style}
      className={cn(classes["wrapper"], className)}
      data-size={size}
    >
      <div
        ref={focusAnchorRef}
        role="button"
        aria-label={strings.components.button.pending}
        aria-disabled="true"
        tabIndex={focusAnchorTabIndex}
        className={classes["focus-anchor"]}
      ></div>
      <ElementTag
        {...otherProps}
        {...(isLink ? anchorProps : buttonProps)}
        inert={isButtonDisabled}
        tabIndex={buttonTabIndex}
        ref={handleRootRef}
        className={cn(
          classes["root"],
          classes[color],
          classes[variant],
          classes[size],
          {
            [classes["disabled"]!]: isButtonDisabled,
          },
        )}
      >
        {children}
      </ElementTag>
    </div>
  );
};
