import { useGetLatest } from "@utils/use-get-latest";
import { useCallback, useRef } from "react";

const __SENTINEL__ = {};

export const useLazyValue = <T>(initFactory: () => T): (() => T) => {
  const lazyValue = useRef<T>(__SENTINEL__ as T);
  const getInitializer = useGetLatest(initFactory);

  return useCallback(() => {
    if (lazyValue.current === __SENTINEL__) {
      const init = getInitializer();

      lazyValue.current = init();
    }

    return lazyValue.current;
  }, [getInitializer]);
};
