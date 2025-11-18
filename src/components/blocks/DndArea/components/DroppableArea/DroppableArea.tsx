import { useDroppable, type UseDroppableArguments } from "@dnd-kit/core";
import type { WithBaseProps } from "@types";
import { cn } from "@utils/cn";
import { useUniqueId } from "@utils/use-unique-id";
import classes from "./styles.module.css";

export type DroppableAreaProps = UseDroppableArguments &
  WithBaseProps<{
    /**
     * The label of the area used for screen readers.
     */
    screenReaderLabel?: string;
  }>;

export const DroppableArea: React.FC<DroppableAreaProps> = props => {
  const {
    children,
    className,
    screenReaderLabel,
    id: droppableId,
    ...hookProps
  } = props;

  const nodeId = useUniqueId();
  const id = `DROPPABLE_AREA_${nodeId}_${droppableId}`;

  const droppable = useDroppable({ ...hookProps, id: droppableId });

  return (
    <div
      ref={droppable.setNodeRef}
      id={id}
      aria-label={screenReaderLabel}
      className={cn(classes["root"], className, {
        [classes["over"]!]: droppable.isOver,
      })}
    >
      {children}
    </div>
  );
};
