import { Flex, Text } from "@/components";
import type { WithBaseProps } from "@/types";
import { cn, useUniqueId } from "@/utils";
import classes from "./styles.module.css";

export type PanelCardProps = WithBaseProps<{
  /**
   * The title of the panel.
   */
  title: string;

  /**
   * The subtitle of the panel.
   */
  subtitle?: string;

  /**
   * The slot to extend heading part.
   */
  headingSlot?: React.ReactNode;
}>;

export const PanelCard: React.FC<PanelCardProps> = props => {
  const { subtitle, title, headingSlot, className, children } = props;

  const nodeId = useUniqueId();
  const titleId = `TITLE_${nodeId}`;

  return (
    <div
      role="region"
      aria-labelledby={titleId}
      className={cn(classes["root"], className)}
    >
      <header className={classes["heading"]}>
        <Flex
          direction="column"
          gap="xs"
        >
          <Text
            as="strong"
            variant="h6"
            id={titleId}
          >
            {title}
          </Text>
          <Text
            as="strong"
            variant="subheading1"
            id={titleId}
            color="tertiary"
          >
            {subtitle}
          </Text>
        </Flex>
        {headingSlot}
      </header>
      {children}
    </div>
  );
};
