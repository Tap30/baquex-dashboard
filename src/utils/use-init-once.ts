import { useRef } from "react";

const __SENTINEL__ = {};

export const useInitOnce = <T>(initFactory: () => T): T => {
  const lazyValue = useRef<T>(__SENTINEL__ as T);

  if (lazyValue.current === __SENTINEL__) lazyValue.current = initFactory();

  return lazyValue.current;
};
