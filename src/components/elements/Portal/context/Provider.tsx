import { useMemo } from "react";
import { PORTAL_DESTINATION_ID } from "./constants.ts";
import { PortalConfig, type PortalConfigValue } from "./PortalConfig.ts";

type Props = {
  children: React.ReactNode;
  config?: PortalConfigValue;
};

const defaultContainerResolver = (): HTMLElement =>
  document.getElementById(PORTAL_DESTINATION_ID) ?? document.body;

export const PortalConfigProvider: React.FC<Props> = props => {
  const { config, children } = props;
  const { resolveContainer = defaultContainerResolver } = config ?? {};

  const context = useMemo(
    () => ({ resolveContainer }) satisfies PortalConfigValue,
    [resolveContainer],
  );

  return (
    <PortalConfig.Provider value={context}>
      <div id={PORTAL_DESTINATION_ID}></div>
      {children}
    </PortalConfig.Provider>
  );
};
