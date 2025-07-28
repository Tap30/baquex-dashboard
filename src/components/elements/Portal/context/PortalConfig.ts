import * as React from "react";

export type PortalConfigValue = {
  /**
   * A function that will resolve the container element for the portals.
   *
   * Please note that this function is only called on the client-side.
   */
  resolveContainer?: () => HTMLElement | null;
};

export const PortalConfig = React.createContext<PortalConfigValue | null>(null);
