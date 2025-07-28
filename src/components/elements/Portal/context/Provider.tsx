import { PORTAL_DESTINATION_ID } from "../constants.ts";
import { PortalConfig, type PortalConfigValue } from "./PortalConfig.ts";

type Props = {
  children: React.ReactNode;
  config?: PortalConfigValue;
};

export const PortalConfigProvider: React.FC<Props> = props => {
  const { config = {}, children } = props;

  return (
    <PortalConfig.Provider value={config}>
      <div id={PORTAL_DESTINATION_ID}></div>
      {children}
    </PortalConfig.Provider>
  );
};
