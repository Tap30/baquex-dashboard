import { usePortalConfig } from "@/components/Portal";
import type { WithRef } from "@/types";
import { cn } from "@/utils/cn";
import { useIsomorphicValue } from "@/utils/use-isomorphic-value";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import classes from "./styles.module.css";

export type TooltipProps = TooltipPrimitive.TooltipProps &
  Pick<
    TooltipPrimitive.TooltipContentProps,
    | "onEscapeKeyDown"
    | "onPointerDownOutside"
    | "side"
    | "sideOffset"
    | "align"
    | "alignOffset"
    | "avoidCollisions"
    | "collisionBoundary"
    | "collisionPadding"
  > &
  WithRef<
    {
      /**
       * The className applied to the component.
       */
      className?: string;

      /**
       * The content of the tooltip.
       */
      text: string;
    },
    "div"
  >;

export const Tooltip: React.FC<TooltipProps> = props => {
  const {
    ref,
    children,
    defaultOpen,
    delayDuration,
    disableHoverableContent,
    onEscapeKeyDown,
    onPointerDownOutside,
    onOpenChange,
    open,
    className,
    text,
    align,
    alignOffset,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    side,
    sideOffset = 4,
  } = props;

  const { resolveContainer } = usePortalConfig();
  const container = useIsomorphicValue(resolveContainer, null);

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        delayDuration={delayDuration}
        disableHoverableContent={disableHoverableContent}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal container={container}>
          <TooltipPrimitive.Content
            ref={ref}
            className={cn(classes["root"], className)}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            align={align}
            alignOffset={alignOffset}
            avoidCollisions={avoidCollisions}
            collisionBoundary={collisionBoundary}
            collisionPadding={collisionPadding}
            side={side}
            sideOffset={sideOffset}
          >
            <span className={classes["text"]}>{text}</span>
            <TooltipPrimitive.Arrow
              width={12}
              height={6}
              className={classes["arrow"]}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
