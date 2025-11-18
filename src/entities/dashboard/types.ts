import type { UnknownRecord } from "@types";

/**
 * Input parameters for dashboard initialization query.
 * Extend this type with specific parameters as needed.
 */
export type InitDashboardInput = UnknownRecord;

/**
 * Output data returned from dashboard initialization query.
 * Contains user profile, permissions, and any additional dashboard data.
 */
export type InitDashboardOutput = {
  user: {
    /**
     * User profile information.
     */
    profile: DashboardUserProfile;

    /**
     * User permissions.
     */
    permissions: DashboardUserPermission[];
  };
} & UnknownRecord;

// START: Public APIs
/**
 * The dashboard data retrieved after initialization.
 */
export type DashboardData = InitDashboardOutput;

/**
 * The permissions actions.
 */
export type DashboardUserPermissionAction =
  | "view"
  | "create"
  | "delete"
  | "edit";

/**
 * A union of all the possible user permissions.
 * It should be in `RESOURCE:ACTION` format.
 * (i.e. `"dashboard:view" | "post:view" | "post:edit"`)
 */
export type DashboardUserPermission = `dashboard:view`;

/**
 * The user profile information.
 */
export type DashboardUserProfile = {
  id: string | number;
  name: string;
  email: string;
};
// END: Public APIs
