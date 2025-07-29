import { useContext } from "react";
import { PortalConfig, type PortalConfigValue } from "./PortalConfig.ts";

export const usePortalConfig = (): PortalConfigValue => {
  const portalConfig = useContext(PortalConfig);

  if (!portalConfig) {
    throw new Error(
      "usePortalConfig must be used within an PortalConfigProvider.",
    );
  }

  return portalConfig;
};
