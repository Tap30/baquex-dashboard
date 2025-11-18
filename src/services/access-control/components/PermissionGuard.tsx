import { ConditionGuard } from "@components/ConditionGuard";
import { Navigate } from "react-router";
import { useAccessControl } from "../hooks.ts";
import type { Permission } from "../types.ts";
import type { ProtectedComponentProps } from "./types.ts";

export type PermissionGuardProps = ProtectedComponentProps & {
  permissions: Permission[];
};

export const PermissionGuard: React.FC<PermissionGuardProps> = props => {
  const { children, permissions, fallback = null, redirectTo } = props;

  const { hasAnyPermission } = useAccessControl();

  const hasAccess = hasAnyPermission(permissions);

  return (
    <ConditionGuard
      condition={hasAccess}
      fallback={
        redirectTo ? (
          <Navigate
            to={redirectTo}
            replace
          />
        ) : (
          fallback
        )
      }
    >
      {children}
    </ConditionGuard>
  );
};
