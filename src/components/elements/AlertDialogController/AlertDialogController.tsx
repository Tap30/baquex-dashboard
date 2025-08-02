import { useEffect } from "react";
import { AlertDialog } from "./components/index.ts";
import { dismissConfirm, useConfirmState } from "./confirm.ts";

export const AlertDialogController = () => {
  const confirmState = useConfirmState();

  useEffect(() => {
    // Dismiss on unmount
    return () => {
      void dismissConfirm();
    };
  }, []);

  if (!confirmState) return null;

  return <AlertDialog {...confirmState} />;
};
