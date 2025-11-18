import { useIsomorphicLayoutEffect } from "@utils/use-isomorphic-layout-effect";
import { useCallback, useRef } from "react";

export const useGetLatest = <T>(value: T): (() => T) => {
  const ref = useRef<T>(value);

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  });

  return useCallback(() => ref.current, []);
};
