import { cn } from "@/utils/cn";
import { useUniqueId } from "@/utils/use-unique-id";
import {
  useDraggable,
  type DraggableAttributes,
  type UseDraggableArguments,
} from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners.js";
import { applyTransform } from "../../utils.ts";
import classes from "./styles.module.css";

export type DraggableAreaRenderProps = {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
};

export type DraggableAreaProps = UseDraggableArguments & {
  /**
   * The classname of the component's root.
   */
  className?: string;

  /**
   * The content to be rendered inside the component.
   * This can be a standard React node or a function that receives
   * `DraggableAreaRenderProps` to create custom drag handles.
   */
  children:
    | React.ReactNode
    | ((renderProps: DraggableAreaRenderProps) => React.ReactNode);
};

export const DraggableArea: React.FC<DraggableAreaProps> = props => {
  const {
    children: childrenProp,
    className,
    id: draggableId,
    ...hookProps
  } = props;

  const nodeId = useUniqueId();
  const id = `DRAGGABLE_AREA_${nodeId}_${draggableId}`;

  const draggable = useDraggable({ ...hookProps, id: draggableId });

  const children =
    childrenProp instanceof Function
      ? childrenProp({
          listeners: draggable.listeners,
          attributes: draggable.attributes,
        })
      : childrenProp;

  return (
    <div
      id={id}
      ref={draggable.setNodeRef}
      className={cn(classes["root"], className, {
        [classes["dragged"]!]: draggable.isDragging,
      })}
      style={applyTransform(draggable.transform)}
    >
      {children}
    </div>
  );
};
