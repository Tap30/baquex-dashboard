import { createContext } from "react";
import type { FormControlProps } from "../types.ts";

export type FormControlContextValue = Required<
  Pick<
    FormControlProps,
    "size" | "autoFocus" | "disabled" | "readOnly" | "hasError"
  >
> & {
  controlId: string;
  setControlId: React.Dispatch<React.SetStateAction<string>>;
  formControlId: string;
  labelId: string;
  descriptionId: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
};

export const FormControlContext = createContext<FormControlContextValue | null>(
  null,
);
