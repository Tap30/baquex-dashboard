import { useContext } from "react";
import { FormControlContext } from "./Context.ts";

export const useFormControl = () => {
  const ctx = useContext(FormControlContext);

  if (!ctx) {
    throw new Error(
      "useFormControl must be used within an FormControlProvider.",
    );
  }

  return ctx;
};
