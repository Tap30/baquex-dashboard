import type { DataStorage } from "@services/storage";
import { useCallback, useEffect, useRef, useState } from "react";

export type UsePersistedStateStorageConfig = {
  name: string;
  storage: DataStorage;
};

type InstanceRef<T> = {
  callbacks: Array<React.Dispatch<React.SetStateAction<T>>>;
  value: T;
};

const __INSTANCES_REF_MAP__: Map<string, InstanceRef<unknown>> = new Map();

const emitInstances = <T>(
  key: string,
  callback: React.Dispatch<React.SetStateAction<T>>,
  value: T,
) => {
  if (!__INSTANCES_REF_MAP__.has(key)) return;

  const instance = __INSTANCES_REF_MAP__.get(key) as InstanceRef<T>;

  if (instance.value === value) return;

  instance.value = value;
  instance.callbacks.forEach(cb => void (callback !== cb && cb(value)));
};

export const usePersistedState = <T>(
  initialValue: T | (() => T),
  storageConfig: UsePersistedStateStorageConfig,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const { name, storage } = storageConfig;

  if (name == null || typeof name !== "string" || name.length === 0) {
    throw new Error(
      `usePersistedState: Expected a valid \`name\` value, received \`${name}\`.`,
    );
  }

  const [state, setState] = useState(initialValue);
  const initialRenderCompleted = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (initialRenderCompleted.current) return;

    const init = storage.getItem<T>(name) ?? initialValue;
    const initialState = init instanceof Function ? init() : init;

    if (state !== initialState) setState(initialState);

    initialRenderCompleted.current = true;
  });

  useEffect(() => {
    const initialState =
      initialValue instanceof Function ? initialValue() : initialValue;

    if (!__INSTANCES_REF_MAP__.has(name)) {
      __INSTANCES_REF_MAP__.set(name, {
        callbacks: [],
        value: initialState,
      });
    }

    (__INSTANCES_REF_MAP__.get(name) as InstanceRef<T>).callbacks.push(
      setState,
    );

    return () => {
      const instance = __INSTANCES_REF_MAP__.get(name) as
        | InstanceRef<T>
        | undefined;

      if (!instance) return;

      const cbs = instance.callbacks;
      const index = cbs.indexOf(setState);

      if (index > -1) cbs.splice(index, 1);
    };
  }, [initialValue, name]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      const { key, newValue } = event;

      if (key !== name) return;

      const initialState =
        initialValue instanceof Function ? initialValue() : initialValue;

      if (newValue == null) {
        setState(initialState);

        return;
      }

      let parsed: T | null;

      try {
        parsed = JSON.parse(newValue) as T;
      } catch {
        parsed = null;
      }

      if (parsed == null) setState(initialState);
      else {
        setState(prevState => {
          if (prevState !== parsed) return parsed;

          return prevState;
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [initialValue, name]);

  const setPersistedState = useCallback(
    (nextState: React.SetStateAction<T>) => {
      setState(prevState => {
        const newState =
          nextState instanceof Function ? nextState(prevState) : nextState;

        storage.setItem<T>(name, newState);

        // Inform other instances in the current tab
        emitInstances(name, setState, newState);

        return newState;
      });
    },

    [name, storage],
  );

  return [state, setPersistedState];
};
