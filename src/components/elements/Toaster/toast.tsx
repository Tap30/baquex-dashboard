import { toast as sonnerToast } from "sonner";
import { Toast, type ToastProps } from "./components/index.ts";

export const toast = (props: Omit<ToastProps, "id">) => {
  return sonnerToast.custom(id => (
    <Toast
      {...props}
      id={id}
    />
  ));
};
