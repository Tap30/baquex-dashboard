import { Flex } from "@components/Flex";
import { Text } from "@components/Text";
import type { WithRef } from "@types";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type AlertProps = WithRef<
  {
    /**
     * The className applied to the component.
     */
    className?: string;

    /**
     * The classnames of the component.
     */
    classNames?: Record<"root" | "title" | "description" | "icon", string>;

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
  const {
    description,
    title,
    classNames,
    className,
    icon,
    color = "neutral",
    ref,
  } = props;

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div
        aria-hidden
        className={cn(classes["icon"], classNames?.icon)}
      >
        {icon}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        classes["root"],
        classes[color],
        className,
        classNames?.root,
      )}
      data-color={color}
    >
      {renderIcon()}
      <Flex
        direction="column"
        alignItems="start"
      >
        <Text
          as="strong"
          variant="subheading2"
          className={cn(classes["title"], classNames?.title)}
        >
          {title}
        </Text>
        <Text
          as="p"
          variant="body2"
          className={cn(classes["description"], classNames?.description)}
        >
          {description}
        </Text>
      </Flex>
    </div>
  );
};
