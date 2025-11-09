import { useIsServerHandoffCompleted } from "@utils/use-is-server-handoff-completed";

const getValue = <T>(valueOrFn: T | (() => T)) => {
  if (valueOrFn instanceof Function) return valueOrFn();

  return valueOrFn;
};

export const useIsomorphicValue = <T>(
  clientValue: T | (() => T),
  serverValue: T | (() => T),
) => {
  const isServerHandoffCompleted = useIsServerHandoffCompleted();

  if (isServerHandoffCompleted) return getValue(clientValue);

  return getValue(serverValue);
};
