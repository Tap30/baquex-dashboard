import type { NavigateFunction, NavigateOptions, To } from "react-router";

const defaultNavigator = (to: To, options?: NavigateOptions): void => {
  const { replace } = options ?? {};

  if (typeof to === "string") {
    const url = new URL(to, window.location.origin);

    if (replace) {
      window.location.replace(url.toString());
    } else {
      window.location.assign(url.toString());
    }
  } else {
    const { pathname, hash, search } = to;

    const url = new URL(window.location.href);

    if (pathname) url.pathname = pathname;
    if (hash) url.hash = hash;
    if (search) url.search = search;

    if (replace) {
      window.location.replace(url.toString());
    } else {
      window.location.assign(url.toString());
    }
  }
};

/**
 * A centralized navigation utility that provides access to the `react-router`'s
 * `navigate` function globally. It falls back to native browser navigation if
 * no `react-router` instance is set. This allows for navigation from non-component
 * contexts like interceptors or utility functions.
 */
class Navigator {
  private _navigator: NavigateFunction | null = null;

  /**
   * Sets the `react-router`'s navigate instance.
   *
   * @param navigator The navigate function provided by `react-router`'s `useNavigate` hook.
   */
  public setInstance(navigator: NavigateFunction): void {
    this._navigator = navigator;
  }

  /**
   * Navigates to a new URL.
   * If a `react-router` instance is set, it uses `react-router` for navigation,
   * which provides client-side routing without a full page reload.
   * Otherwise, it defaults to a full page redirect using `window.location`.
   *
   * @param to The destination to navigate to, which can be a string or an object.
   * @param options Optional navigation options.
   */
  public navigate(to: To, options?: NavigateOptions): void | Promise<void> {
    const navigator = this._navigator ?? defaultNavigator;

    return navigator(to, options);
  }
}

/**
 * The globally accessible instance of the Navigator.
 * Use this instance to set the navigator and perform all navigation actions.
 */
export const globalNavigator = new Navigator();
