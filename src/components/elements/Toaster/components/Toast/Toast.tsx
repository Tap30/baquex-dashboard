import { Button, Flex, Text } from "@/components";
import { toast as sonnerToast } from "sonner";
import classes from "./styles.module.css";

export type ToastProps = {
  /**
   * The id of the toast object.
   */
  id: string | number;

  /**
   * The title of the toast.
   */
  title: string;

  /**
   * The description of the toast.
   */
  description?: string;

  /**
   * The primary action of the toast.
   */
  button?: {
    label: string;
    onClick: React.MouseEventHandler;
  };
};

export const Toast: React.FC<ToastProps> = props => {
  const { id, title, description, button } = props;

  const handleClick: React.MouseEventHandler = event => {
    if (!button) return;

    button.onClick(event);
    sonnerToast.dismiss(id);
  };

  const renderButton = () => {
    if (!button) return null;

    return (
      <Button
        className={classes["button"]}
        text={button.label}
        onClick={handleClick}
        variant="ghost"
      />
    );
  };

  const renderDescription = () => {
    if (!description) return null;

    return (
      <Text
        variant="body2"
        as="p"
      >
        {description}
      </Text>
    );
  };

  return (
    <div className={classes["root"]}>
      <Flex
        alignItems="start"
        direction="column"
        gap="sm"
      >
        <Text
          variant="subheading2"
          as="strong"
        >
          {title}
        </Text>
        {renderDescription()}
      </Flex>
      {renderButton()}
    </div>
  );
};
