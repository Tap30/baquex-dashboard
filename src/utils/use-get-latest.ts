import { useCallback, useRef } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect.ts";

export const useGetLatest = <T>(value: T): (() => T) => {
  const ref = useRef<T>(value);

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  });

  return useCallback(() => ref.current, []);
};
