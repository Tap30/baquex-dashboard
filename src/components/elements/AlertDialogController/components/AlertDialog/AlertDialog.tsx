import { Button, usePortalConfig } from "@/components";
import { strings } from "@/static-content";
import type { WithRef } from "@/types";
import { useIsomorphicValue } from "@/utils";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { useEffect, useRef } from "react";
import classes from "./styles.module.css";

export type AlertDialogProps = WithRef<
  {
    /**
     * The id of the dialog.
     */
    id: string;

    /**
     * If `true`, the dialog will be opened.
     */
    open: boolean;

    /**
     * The title of the dialog.
     */
    title: string;

    /**
     * The description of the alert message.
     */
    description: React.ReactNode;

    /**
     * Callback called when the "cancel" button is clicked.
     */
    onCancel: () => void;

    /**
     * Callback called when the "ok" button is clicked.
     */
    onOk: () => void;

    /**
     * The text to use for the "ok" action button.
     */
    okText: string;
  } & Pick<
    AlertDialogPrimitive.AlertDialogContentProps,
    "onOpenAutoFocus" | "onCloseAutoFocus" | "onEscapeKeyDown"
  >,
  "div"
>;

export const AlertDialog: React.FC<AlertDialogProps> = props => {
  const {
    id,
    ref,
    description,
    okText,
    open,
    title,
    onCancel,
    onOk,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onOpenAutoFocus,
  } = props;

  const previousActiveElement = useRef<HTMLElement | null>(null);

  const { resolveContainer } = usePortalConfig();
  const container = useIsomorphicValue(resolveContainer, null);

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  const handleCloseAutoFocus = (event: Event) => {
    onCloseAutoFocus?.(event);

    if (event.defaultPrevented) return;

    previousActiveElement.current?.focus();
    previousActiveElement.current = null;
  };

  return (
    <AlertDialogPrimitive.Root open={open}>
      <AlertDialogPrimitive.Portal container={container}>
        <div
          role="presentation"
          ref={ref}
          id={id}
          tabIndex={-1}
          aria-hidden={!open}
          className={classes["root"]}
        >
          <AlertDialogPrimitive.Overlay className={classes["overlay"]} />
          <AlertDialogPrimitive.Content
            className={classes["content"]}
            onCloseAutoFocus={handleCloseAutoFocus}
            onOpenAutoFocus={onOpenAutoFocus}
            onEscapeKeyDown={onEscapeKeyDown}
          >
            <header className={classes["header"]}>
              <AlertDialogPrimitive.Title className={classes["title"]}>
                {title}
              </AlertDialogPrimitive.Title>
            </header>
            <AlertDialogPrimitive.Description
              className={classes["description"]}
            >
              {description}
            </AlertDialogPrimitive.Description>
            <div className={classes["actions"]}>
              <Button
                variant="filled"
                color="brand"
                text={okText}
                onClick={onOk}
              />
              <Button
                variant="ghost"
                color="neutral"
                text={strings.cancel}
                onClick={onCancel}
              />
            </div>
          </AlertDialogPrimitive.Content>
        </div>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};
