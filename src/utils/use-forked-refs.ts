import { handleRef } from "@utils/handle-ref";
import { useCallback } from "react";

export const useForkedRefs = <T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> => {
  return useCallback<React.RefCallback<T>>(
    instance => {
      refs.forEach(ref => {
        if (!ref) return;

        handleRef(ref, instance);
      });
    },
    [refs],
  );
};
