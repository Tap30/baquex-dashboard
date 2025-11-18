import type { To } from "react-router";

export type ProtectedComponentProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: To;
};
