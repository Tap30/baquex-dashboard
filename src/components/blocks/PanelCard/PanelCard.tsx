import { Flex } from "@components/Flex";
import { Spinner } from "@components/Spinner";
import { Text } from "@components/Text";
import type { WithBaseProps } from "@types";
import { cn } from "@utils/cn";
import { useUniqueId } from "@utils/use-unique-id";
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

  /**
   * Whether the card is pending.
   *
   * @default false
   */
  pending?: boolean;
}>;

export const PanelCard: React.FC<PanelCardProps> = props => {
  const {
    subtitle,
    title,
    headingSlot,
    className,
    children,
    pending = false,
  } = props;

  const nodeId = useUniqueId();
  const titleId = `TITLE_${nodeId}`;

  return (
    <div
      role="region"
      aria-labelledby={titleId}
      aria-busy={pending}
      inert={pending}
      className={cn(classes["root"], className, {
        [classes["pending"]!]: pending,
      })}
    >
      <div className={classes["pending-overlay"]}>
        <Spinner size={20} />
      </div>
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
