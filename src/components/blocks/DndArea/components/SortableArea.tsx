import { Portal } from "@/components";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DndContextProps,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  type SortableContextProps,
} from "@dnd-kit/sortable";
import { useState } from "react";

export type SortableAreaRenderProps = {
  activeId: UniqueIdentifier;
  activeIndex: number;
};

export type SortableAreaProps = DndContextProps &
  SortableContextProps & {
    /**
     * Drag overlay component provides a way to render a draggable overlay that
     * is removed from the normal document flow and is positioned relative to the
     * viewport.
     *
     * To disable this set `dragOverlayProps.disabled` to `true`.
     */
    dragOverlayProps?: Pick<
      React.ComponentProps<typeof DragOverlay>,
      "adjustScale" | "className" | "modifiers" | "dropAnimation"
    > & {
      /**
       * Whether to disable drag overlay.
       *
       * @default false
       */
      disabled?: boolean;

      /**
       * The content to be rendered inside the component.
       * This can be a standard React node or a function that receives
       * `SortableAreaRenderProps` to create custom drag overlay.
       */
      children?:
        | React.ReactNode
        | ((renderProps: SortableAreaRenderProps) => React.ReactNode);
    };

    /**
     * Event handler called when the ordering changes.
     */
    onOrderChange?: (newItems: SortableContextProps["items"]) => void;
  };

export const SortableArea: React.FC<SortableAreaProps> = props => {
  const {
    children,
    items,
    disabled,
    strategy,
    collisionDetection = closestCorners,
    dragOverlayProps,
    sensors: sensorsProp,
    onDragStart,
    onDragEnd,
    onDragCancel,
    onOrderChange,
    ...otherProps
  } = props;

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const getIndex = (id: UniqueIdentifier) => items.indexOf(id);

  const activeIndex = activeId != null ? getIndex(activeId) : -1;

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    ...(sensorsProp ?? []),
  );

  const handleDragStart: DndContextProps["onDragStart"] = event => {
    onDragStart?.(event);

    const { active } = event;

    if (!active) return;

    setActiveId(active.id);
  };

  const handleDragEnd: DndContextProps["onDragEnd"] = event => {
    onDragEnd?.(event);

    const { over } = event;

    setActiveId(null);

    if (over) {
      const overIndex = getIndex(over.id);

      if (activeIndex !== overIndex) {
        onOrderChange?.(arrayMove(items, activeIndex, overIndex));
      }
    }
  };

  const handleDragCancel: DndContextProps["onDragCancel"] = event => {
    onDragCancel?.(event);

    setActiveId(null);
  };

  const renderDragOverlay = () => {
    const {
      disabled = false,
      children: childrenProp,
      ...etc
    } = dragOverlayProps ?? {};

    if (disabled) return null;
    if (!activeId) return null;

    const children =
      childrenProp instanceof Function
        ? childrenProp({ activeId, activeIndex })
        : childrenProp;

    return (
      <Portal>
        <DragOverlay {...etc}>{children}</DragOverlay>
      </Portal>
    );
  };

  return (
    <DndContext
      {...otherProps}
      collisionDetection={collisionDetection}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={items}
        disabled={disabled}
        strategy={strategy}
      >
        {children}
      </SortableContext>
      {renderDragOverlay()}
    </DndContext>
  );
};
