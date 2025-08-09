import { Portal } from "@/components";
import {
  DndContext,
  DragOverlay,
  type DndContextProps,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { useState } from "react";

export type DndAreaRenderProps = {
  activeId: UniqueIdentifier;
};

export type DndAreaProps = DndContextProps & {
  /**
   * Drag overlay component provides a way to render a draggable overlay that
   * is removed from the normal document flow and is positioned relative to the
   * viewport.
   *
   * To enable this set `dragOverlayProps.enabled` to `true`.
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
     * `DndAreaRenderProps` to create custom drag overlay.
     */
    children:
      | React.ReactNode
      | ((renderProps: DndAreaRenderProps) => React.ReactNode);
  };
};

export const DndArea: React.FC<DndAreaProps> = props => {
  const {
    children,
    dragOverlayProps,
    onDragStart,
    onDragEnd,
    onDragCancel,
    ...otherProps
  } = props;

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragStart: DndContextProps["onDragStart"] = event => {
    onDragStart?.(event);

    const { active } = event;

    if (!active) return;

    setActiveId(active.id);
  };

  const handleDragEnd: DndContextProps["onDragEnd"] = event => {
    onDragEnd?.(event);

    setActiveId(null);
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
        ? childrenProp({ activeId })
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
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {children}
      {renderDragOverlay()}
    </DndContext>
  );
};
