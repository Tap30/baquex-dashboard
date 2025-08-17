import { Button } from "@components/Button";
import { Flex } from "@components/Flex";
import { Icon } from "@components/Icon";
import { IconButton } from "@components/IconButton";
import { Text } from "@components/Text";
import { mdiClose } from "@mdi/js";
import { strings } from "@static-content";
import { cn } from "@utils/cn";
import { useCallback } from "react";
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
    onClick: (ctx: { id: string | number; dismiss: () => void }) => void;
  };

  /**
   * The color scheme of the toast.
   *
   * @default "neutral"
   */
  color?: "neutral" | "brand" | "positive" | "negative" | "warn" | "info";
};

export const Toast: React.FC<ToastProps> = props => {
  const { id, title, description, button, color = "neutral" } = props;

  const dismiss = useCallback(() => {
    sonnerToast.dismiss(id);
  }, [id]);

  const handleActionClick = () => {
    if (!button) return;

    button.onClick({ id, dismiss });
  };

  const renderButton = () => {
    if (!button) return null;

    return (
      <Button
        text={button.label}
        onClick={handleActionClick}
        variant="ghost"
        size="sm"
      />
    );
  };

  const renderDescription = () => {
    if (!description) return null;

    return (
      <Text
        variant="body2"
        as="p"
        className={classes["description"]}
      >
        {description}
      </Text>
    );
  };

  return (
    <div className={cn(classes["root"], classes[color])}>
      <Flex alignItems="start">
        <Text
          variant="subheading2"
          as="strong"
          className={classes["title"]}
        >
          {title}
        </Text>
        <Flex
          alignItems="center"
          gap="xs"
          className={classes["actions"]}
        >
          {renderButton()}
          <IconButton
            aria-label={strings.close}
            icon={<Icon data={mdiClose} />}
            variant="ghost"
            size="sm"
            onClick={dismiss}
          />
        </Flex>
      </Flex>
      {renderDescription()}
    </div>
  );
};
