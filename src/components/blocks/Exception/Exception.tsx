import { Button, type ButtonProps } from "@components/Button";
import { Flex, FlexItem } from "@components/Flex";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import { mdiBlockHelper } from "@mdi/js";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type ExceptionProps = {
  /**
   * Optional illustration or icon displayed near the text content.
   * If not provided, defaults to a negative-colored block helper icon.
   */
  illustration?: React.ReactNode;

  /**
   * Main heading text displayed at the top of the exception content.
   */
  title: string;

  /**
   * Detailed message explaining the exception or state.
   */
  description: string;

  /**
   * Props for the action button displayed below the description.
   * Can be used to set label, click handler, and other `Button` props.
   */
  action: ButtonProps;
};

export const Exception: React.FC<ExceptionProps> = props => {
  const {
    action,
    description,
    illustration = (
      <Icon
        data={mdiBlockHelper}
        color="negative"
      />
    ),
    title,
  } = props ?? {};

  return (
    <FlexItem className={classes["root"]}>
      <Flex
        gap="xxl"
        direction={{ sm: "row", fallback: "column" }}
      >
        <div className={cn(classes["icon"], "m-auto", "sm:m-0")}>
          {illustration}
        </div>
        <Flex
          className={classes["content"]}
          direction="column"
          justifyContent="center"
          alignItems={{ sm: "start", fallback: "center" }}
        >
          <Text
            variant="h5"
            weight={500}
            as="h1"
          >
            {title}
          </Text>

          <Text
            className={cn(
              classes["description"],
              "text-center",
              "sm:text-start",
            )}
            variant="body1"
            color="secondary"
          >
            {description}
          </Text>

          <Button {...action} />
        </Flex>
      </Flex>
    </FlexItem>
  );
};
