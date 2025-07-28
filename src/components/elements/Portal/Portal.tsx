import { useIsomorphicValue } from "@/utils";
import { createPortal } from "react-dom";
import { PORTAL_DESTINATION_ID } from "./constants.ts";
import { usePortalConfig } from "./context/index.ts";

export type Props = {
  /**
   * A function that will resolve the container element for the portal.
   * If not provided will opt-in `PortalConfigProvider` configuration as default behavior.
   *
   * Please note that this function is only called on the client-side.
   */
  resolveContainer?: () => HTMLElement | null;

  /**
   * The children to render into the container.
   */
  children: React.ReactNode;

  /**
   * If `true`, the `children` will be under the DOM hierarchy of the parent component.
   *
   * @default false
   */
  disabled?: boolean;
};

const Portal = (props: Props) => {
  const { resolveContainer, children, disabled = false } = props;

  const portalConfig = usePortalConfig();

  const containerResolver =
    resolveContainer ??
    portalConfig?.resolveContainer ??
    (() => document.getElementById(PORTAL_DESTINATION_ID) ?? document.body);

  const container = useIsomorphicValue(containerResolver, null);

  if (disabled) return <>{children}</>;
  if (!container) return null;

  return createPortal(children, container);
};

export default Portal;
