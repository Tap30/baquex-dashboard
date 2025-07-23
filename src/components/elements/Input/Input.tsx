import type { MergeElementProps } from "@/types";
import { cn } from "@/utils";
import { useFormControl } from "../FormControl/index.ts";
import classes from "./styles.module.css";

export type InputProps = Omit<
  MergeElementProps<
    "input",
    {
      /**
       * The slot used for element placed at the start.
       */
      startSlot?: React.ReactNode;

      /**
       * The slot used for element placed at the end.
       */
      endSlot?: React.ReactNode;
    }
  >,
  | "children"
  | "autoFocus"
  | "aria-invalid"
  | "aria-describedby"
  | "aria-label"
  | "aria-labelledby"
  | "disabled"
  | "readOnly"
>;

export const Input: React.FC<InputProps> = props => {
  const { className, id: idProp, startSlot, endSlot, ...otherProps } = props;

  const {
    formControlId,
    controlId,
    setControlId,
    ariaDescribedBy,
    ariaInvalid,
    ariaLabel,
    autoFocus,
    disabled,
    readOnly,
  } = useFormControl();

  const id = idProp ?? controlId;
  const rootId = `INPUT_${formControlId}`;

  if (id !== controlId) setControlId(id);

  const renderStartSlot = () => {
    if (!startSlot) return null;

    return <div className={classes["start-slot"]}>{startSlot}</div>;
  };

  const renderEndSlot = () => {
    if (!endSlot) return null;

    return <div className={classes["end-slot"]}>{endSlot}</div>;
  };

  return (
    <div
      id={rootId}
      className={cn(classes["root"], className, {
        [classes["disabled"]!]: disabled,
      })}
    >
      {renderStartSlot()}
      <input
        {...otherProps}
        autoFocus={autoFocus}
        id={id}
        readOnly={readOnly}
        inert={disabled}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={classes["input"]}
      />
      {renderEndSlot()}
    </div>
  );
};
