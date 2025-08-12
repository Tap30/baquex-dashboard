import { Button, type ButtonProps, Flex, Icon, Text } from "@/components";
import { useMediaQuery } from "@/utils";
import { mdiBlockHelper } from "@mdi/js";
import classes from "./styles.module.css";

export type ExceptionProps = {
  /**
   * Optional illustration or icon displayed to the left or above the text content.
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

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex className={classes["root"]}>
      <Flex
        gap="xxl"
        direction={{ sm: "row", fallback: "column" }}
      >
        <div
          className={classes["icon"]}
          style={{
            margin: isMobile ? "auto" : "0",
          }}
        >
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
            className={classes["description"]}
            variant="body1"
            color="secondary"
            align={isMobile ? "center" : "start"}
          >
            {description}
          </Text>

          <Button {...action} />
        </Flex>
      </Flex>
    </Flex>
  );
};
