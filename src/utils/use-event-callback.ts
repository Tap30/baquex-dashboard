import { useGetLatest } from "@utils/use-get-latest";
import { useCallback } from "react";

/**
 * A community-wide workaround for `useCallback()`.
 * Because the `useCallback()` hook invalidates too often in practice.
 *
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
export const useEventCallback = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TEvent extends React.SyntheticEvent<any>,
  TCallback extends React.EventHandler<TEvent> = React.EventHandler<TEvent>,
>(
  callback: TCallback,
): TCallback => {
  const getCb = useGetLatest(callback);

  const handler: TCallback = useCallback(
    (event => {
      const cb = getCb();

      cb(event);
    }) as TCallback,
    [getCb],
  );

  return handler;
};
