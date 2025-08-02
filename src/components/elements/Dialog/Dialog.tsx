import {
  Button,
  Icon,
  IconButton,
  usePortalConfig,
  type ButtonProps,
} from "@/components";
import type { WithRef } from "@/types";
import { cn, useIsomorphicValue, useUniqueId } from "@/utils";
import { mdiClose } from "@mdi/js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useEffect, useRef } from "react";
import classes from "./styles.module.css";

export type DialogAction = Pick<
  ButtonProps,
  "text" | "endIcon" | "startIcon" | "disabled" | "pending" | "onClick"
>;

export type DialogProps = WithRef<
  {
    /**
     * If `true`, the dialog will be opened.
     */
    open: boolean;

    /**
     * Callback is called when the dialog is about to be closed.
     * This function is required because it will be called when certain interactions occur.
     */
    onClose: () => void;

    /**
     * Whether to hide heading.
     *
     * @default false;
     */
    hideHeading?: boolean;

    /**
     * The modality of the dialog.
     * When set to `true`, interaction with outside elements will be disabled
     * and only dialog content will be visible to screen readers.
     *
     * @default true
     */
    modal?: boolean;

    /**
     * The className applied to the component.
     */
    className?: string;

    /**
     * The title of the dialog.
     */
    title: string;

    /**
     * The main content of the dialog.
     */
    content: React.ReactNode;

    /**
     * The cancel action button used in the dialog.
     */
    cancelAction?: DialogAction;

    /**
     * The ok action button used in the dialog.
     */
    okAction?: DialogAction;
  } & Pick<
    DialogPrimitive.DialogContentProps,
    | "onOpenAutoFocus"
    | "onCloseAutoFocus"
    | "onEscapeKeyDown"
    | "onPointerDownOutside"
    | "onInteractOutside"
  >,
  "div"
>;

export const Dialog: React.FC<DialogProps> = props => {
  const {
    cancelAction,
    content,
    okAction,
    title,
    ref,
    open,
    className,
    onClose,
    modal = true,
    hideHeading = false,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onInteractOutside,
    onOpenAutoFocus,
    onPointerDownOutside,
  } = props;

  const nodeId = useUniqueId();
  const cancelBtnId = `CANCEL_BTN_${nodeId}`;

  const previousActiveElement = useRef<HTMLElement | null>(null);

  const { resolveContainer } = usePortalConfig();
  const container = useIsomorphicValue(resolveContainer, null);

  const hasTextDescription = typeof content !== "object";

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  const handleOpenChange = (openState: boolean) => {
    if (openState) return;

    onClose();
  };

  const handleCloseAutoFocus = (event: Event) => {
    onCloseAutoFocus?.(event);

    if (event.defaultPrevented) return;

    previousActiveElement.current?.focus();
    previousActiveElement.current = null;
  };

  const renderCancel = () => {
    if (!cancelAction) return null;

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = event => {
      cancelAction.onClick?.(event);

      if (event.defaultPrevented) return;

      onClose();
    };

    return (
      <Button
        {...cancelAction}
        id={cancelBtnId}
        variant="ghost"
        color="neutral"
        onClick={handleCancel}
      />
    );
  };

  const renderOk = () => {
    if (!okAction) return null;

    return (
      <Button
        {...okAction}
        variant="filled"
        color="neutral"
      />
    );
  };

  const renderActions = () => {
    if (!okAction && !cancelAction) return null;

    return (
      <div className={classes["actions"]}>
        {renderOk()}
        {renderCancel()}
      </div>
    );
  };

  const renderBody = () => {
    if (!content) return null;

    if (hasTextDescription) {
      return (
        <DialogPrimitive.Description className={classes["description"]}>
          {content}
        </DialogPrimitive.Description>
      );
    }

    return content;
  };

  return (
    <DialogPrimitive.Root
      open={open}
      modal={modal}
      onOpenChange={handleOpenChange}
    >
      <DialogPrimitive.Portal container={container}>
        <div
          role="presentation"
          ref={ref}
          tabIndex={-1}
          aria-hidden={!open}
          className={cn(classes["root"], className)}
        >
          <DialogPrimitive.Overlay className={classes["overlay"]} />
          <DialogPrimitive.Content
            {...(hasTextDescription ? {} : { "aria-describedby": undefined })}
            data-no-heading={hideHeading ? "" : undefined}
            className={classes["content"]}
            onCloseAutoFocus={handleCloseAutoFocus}
            onOpenAutoFocus={onOpenAutoFocus}
            onEscapeKeyDown={onEscapeKeyDown}
            onInteractOutside={onInteractOutside}
            onPointerDownOutside={onPointerDownOutside}
          >
            <header
              className={cn(classes["header"], { "sr-only": hideHeading })}
            >
              <DialogPrimitive.Title className={classes["title"]}>
                {title}
              </DialogPrimitive.Title>
              <IconButton
                className={classes["close"]}
                aria-labelledby={cancelBtnId}
                icon={<Icon data={mdiClose} />}
                variant="ghost"
                size="md"
                onClick={onClose}
              />
            </header>
            <div className={classes["body"]}>{renderBody()}</div>
            {renderActions()}
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
