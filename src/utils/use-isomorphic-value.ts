import { useIsServerHandoffComplete } from "./use-is-server-handoff-complete.ts";

const getValue = <T>(valueOrFn: T | (() => T)) => {
  if (valueOrFn instanceof Function) return valueOrFn();

  return valueOrFn;
};

export const useIsomorphicValue = <T>(
  clientValue: T | (() => T),
  serverValue: T | (() => T),
) => {
  const isServerHandoffComplete = useIsServerHandoffComplete();

  if (isServerHandoffComplete) return getValue(clientValue);

  return getValue(serverValue);
};
