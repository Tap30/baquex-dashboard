import { useMemo } from "react";
import { PortalConfig, type PortalConfigValue } from "./PortalConfig.ts";

type Props = {
  children: React.ReactNode;
  config: PortalConfigValue;
};

export const PortalConfigProvider: React.FC<Props> = props => {
  const { config, children } = props;
  const { resolveContainer } = config ?? {};

  const context = useMemo(
    () => ({ resolveContainer }) satisfies PortalConfigValue,
    [resolveContainer],
  );

  return (
    <PortalConfig.Provider value={context}>{children}</PortalConfig.Provider>
  );
};
