import { useEffect } from "react";
import {
  Container,
  useUpdate,
  useValue,
  type Updater,
} from "react-containerized-state";

export const pageLoaderStore = Container.create(false);

export const useIsPageLoading = (): boolean => useValue(pageLoaderStore);
export const useSetIsPageLoading = (): Updater<boolean> =>
  useUpdate(pageLoaderStore);

export const useSyncWithPageLoader = (state: boolean): boolean => {
  const updateIsPageLoading = useSetIsPageLoading();
  const isPageLoading = useIsPageLoading();

  useEffect(() => {
    void updateIsPageLoading(state);
  }, [state, updateIsPageLoading]);

  return isPageLoading;
};
