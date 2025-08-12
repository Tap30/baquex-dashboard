import { type MergeElementProps } from "@/types";
import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";
import classes from "./styles.module.css";

export type PageLoadingProps = MergeElementProps<
  "div",
  {
    /**
     * Append to the classNames applied to the component so you can override or
     * extend the styles.
     */
    className?: string;
    /**
     * If `true`, the component will indicate the loading progress.
     * @default false
     */
    loading?: boolean;
  }
>;

export const PageLoading: React.FC<PageLoadingProps> = ({
  loading = true,
  ...otherProps
}) => {
  const step = useRef(0);
  const taskInterval = useRef<number | null>(null);

  const stepValue = useRef(0.05);

  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading) {
      setVisible(true);
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
        }

        if (newWidth >= 100) {
          if (taskInterval.current) {
            clearInterval(taskInterval.current);
          }
        }
      };

      taskInterval.current = window.setInterval(task, 100);
    } else {
      if (taskInterval.current) {
        clearInterval(taskInterval.current);
      }

      setWidth(100);

      const timeout = window.setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 400);

      return () => {
        clearTimeout(timeout);
      };
    }

    return () => {
      if (taskInterval.current) {
        clearInterval(taskInterval.current);
      }
    };
  }, [loading]);

  return (
    <div
      className={cn(classes["root"], {
        [classes["visible"]!]: visible,
      })}
      {...otherProps}
    >
      <div className={classes["overlay"]}></div>
      <div
        className={classes["progress"]}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};
