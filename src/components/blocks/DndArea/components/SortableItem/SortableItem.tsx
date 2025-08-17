import { cn } from "@/utils/cn";
import { useUniqueId } from "@/utils/use-unique-id";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners.js";
import { useSortable, type UseSortableArguments } from "@dnd-kit/sortable";
import classes from "./styles.module.css";

export type SortableItemRenderProps = {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
};

export type SortableItemProps = UseSortableArguments & {
  /**
   * The classname of the component's root.
   */
  className?: string;

  /**
   * The content to be rendered inside the component.
   * This can be a standard React node or a function that receives
   * `SortableItemRenderProps` to create custom drag handles.
   */
  children:
    | React.ReactNode
    | ((renderProps: SortableItemRenderProps) => React.ReactNode);
};

export const SortableItem: React.FC<SortableItemProps> = props => {
  const {
    className,
    children: childrenProp,
    id: sortableId,
    ...hookProps
  } = props;

  const nodeId = useUniqueId();
  const id = `SORTABLE_ITEM_${nodeId}_${sortableId}`;

  const sortable = useSortable({ ...hookProps, id: sortableId });

  const children =
    childrenProp instanceof Function
      ? childrenProp({
          listeners: sortable.listeners,
          attributes: sortable.attributes,
        })
      : childrenProp;

  const { x, y, scaleX, scaleY } = sortable.transform ?? {};

  const style = {
    "--dx": x ? `${Math.round(x)}px` : undefined,
    "--dy": y ? `${Math.round(y)}px` : undefined,
    "--scale-x": scaleX ? scaleX : undefined,
    "--scale-y": scaleY ? scaleY : undefined,
    transition: sortable.transition,
  } as React.CSSProperties;

  return (
    <div
      id={id}
      ref={sortable.setNodeRef}
      className={cn(classes["root"], className, {
        [classes["dragged"]!]: sortable.isDragging,
      })}
      style={style}
    >
      {children}
    </div>
  );
};
