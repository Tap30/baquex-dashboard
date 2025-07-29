import { Flex, Text } from "@/components";
import type { WithRef } from "@/types";
import { cn } from "@/utils";
import classes from "./styles.module.css";

export type AlertProps = WithRef<
  {
    /**
     * The className applied to the component.
     */
    className?: string;

    /**
     * The title of the alert.
     */
    title: string;

    /**
     * The description of the alert.
     */
    description: string;

    /**
     * The icon used for the alert message.
     */
    icon?: React.ReactNode;

    /**
     * The color scheme of the alert.
     *
     * @default "neutral"
     */
    color?: "neutral" | "brand" | "positive" | "negative" | "warn" | "info";
  },
  "div"
>;

export const Alert: React.FC<AlertProps> = props => {
  const { description, title, className, icon, color = "neutral", ref } = props;

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div
        aria-hidden
        className={classes["icon"]}
      >
        {icon}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(classes["root"], classes[color], className)}
    >
      {renderIcon()}
      <Flex
        direction="column"
        alignItems="start"
      >
        <Text
          as="strong"
          variant="subheading2"
          className={classes["title"]}
        >
          {title}
        </Text>
        <Text
          as="p"
          variant="body2"
          className={classes["description"]}
        >
          {description}
        </Text>
      </Flex>
    </div>
  );
};
