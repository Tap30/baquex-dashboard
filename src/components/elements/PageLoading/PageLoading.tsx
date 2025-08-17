import { Portal } from "@/components/Portal";
import { strings } from "@/static-content";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import classes from "./styles.module.css";

export type PageLoadingProps = {
  /**
   * Append to the classNames applied to the component so you can override or
   * extend the styles.
   */
  className?: string;

  /**
   * If `true`, the component will indicate the loading progress.
   *
   * @default false
   */
  loading?: boolean;
};

export const PageLoading: React.FC<PageLoadingProps> = props => {
  const { loading = true, className } = props;

  const rootRef = useRef<HTMLDivElement | null>(null);

  const step = useRef(0);
  const taskInterval = useRef<number | null>(null);

  const stepValue = useRef(0.05);

  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (loading) {
      setIsVisible(true);

      step.current = 0;
      stepValue.current = 0.05;

      const task = () => {
        step.current += stepValue.current;

        const newWidth =
          Math.round((Math.atan(step.current) / (Math.PI / 2)) * 100 * 1000) /
          1000;

        setWidth(newWidth);

        if (newWidth >= 60) {
          stepValue.current = 0.005;
        } else if (newWidth >= 100 && taskInterval.current) {
          window.clearInterval(taskInterval.current);
          taskInterval.current = null;
        }
      };

      taskInterval.current = window.setInterval(task, 100);
    } else {
      if (taskInterval.current) {
        window.clearInterval(taskInterval.current);
      }

      setWidth(100);

      const timeout = window.setTimeout(() => {
        setIsVisible(false);
        setWidth(0);
      }, 400);

      return () => {
        window.clearTimeout(timeout);
      };
    }

    return () => {
      if (taskInterval.current) {
        window.clearInterval(taskInterval.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    if (!isVisible) return;

    const handleFocus = () => {
      const root = rootRef.current;

      if (!root) return;
      if (document.activeElement === root) return;

      (document.activeElement as HTMLElement)?.blur();
    };

    document.addEventListener("focus", handleFocus, { capture: true });

    return () => {
      document.removeEventListener("focus", handleFocus, { capture: true });
    };
  }, [isVisible]);

  return (
    <Portal>
      <div
        ref={rootRef}
        aria-busy={isVisible}
        aria-hidden={!isVisible}
        aria-label={strings.components.button.pending}
        role="progressbar"
        className={cn(classes["root"], className, {
          [classes["visible"]!]: isVisible,
        })}
      >
        <div className={classes["overlay"]}></div>
        <div
          className={classes["progress"]}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </Portal>
  );
};
