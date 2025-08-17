import { Spinner } from "@components/Spinner";
import { cn } from "@utils/cn";
import { BaseButton, type BaseButtonProps } from "../../internals/index.ts";
import classes from "./styles.module.css";

export type ButtonProps = Omit<
  BaseButtonProps & {
    /**
     * The content of the button.
     */
    text: string;

    /**
     * The icon element placed before the text.
     */
    startIcon?: React.ReactNode;

    /**
     * The icon element placed after the text.
     */
    endIcon?: React.ReactNode;
  },
  "children"
>;

export const Button: React.FC<ButtonProps> = props => {
  const {
    className,
    text,
    startIcon,
    endIcon,
    pending = false,
    fluid = false,
    ...otherProps
  } = props;

  const renderStartIcon = () => {
    if (!pending && !startIcon) return null;

    const icon = pending ? <Spinner /> : startIcon;

    return (
      <div
        aria-hidden
        className={cn(classes["icon"], classes["start-icon"])}
      >
        {icon}
      </div>
    );
  };

  const renderEndIcon = () => {
    if (!endIcon) return null;

    return (
      <div
        aria-hidden
        className={cn(classes["icon"], classes["end-icon"])}
      >
        {endIcon}
      </div>
    );
  };

  return (
    <BaseButton
      {...otherProps}
      pending={pending}
      fluid={fluid}
      className={cn(classes["root"], className, {
        [classes["fluid"]!]: fluid,
      })}
    >
      {renderStartIcon()}
      <span className={classes["text"]}>{text}</span>
      {renderEndIcon()}
    </BaseButton>
  );
};
