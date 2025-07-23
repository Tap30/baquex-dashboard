import { useCallback } from "react";

const setRef = <T>(ref: React.Ref<T>, instance: T | null) => {
  if (typeof ref === "function") ref(instance);
  else if (ref && typeof ref === "object" && "current" in ref) {
    ref.current = instance;
  }
};

export const useForkedRefs = <T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> => {
  return useCallback<React.RefCallback<T>>(
    instance => {
      refs.forEach(ref => {
        if (!ref) return;

        setRef(ref, instance);
      });
    },
    [refs],
  );
};
