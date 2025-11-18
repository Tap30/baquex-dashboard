import { AlertDialogController } from "@components/AlertDialogController";
import { DashboardLayout } from "@components/DashboardLayout";
import { MainLayout } from "@components/MainLayout";
import { PortalConfigProvider } from "@components/Portal";
import { Toaster } from "@components/Toaster";
import { PORTAL_DESTINATION_ID } from "@constants/config";
import { ACCESS_DENIED_PATH, DASHBOARD_PATH } from "@constants/routes";
import { DirectionProvider } from "@contexts/Direction";
import { Dashboard } from "@entities/dashboard";
import {
  AccessControlProvider,
  PermissionGuard,
} from "@services/access-control";
import { QueryClientProvider } from "@services/query-client";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const DashboardPage = lazy(() => import("@pages/dynamic/Dashboard"));

const ErrorPage = lazy(() => import("@pages/dynamic/Error"));
const AccessDeniedPage = lazy(() => import("@pages/dynamic/AccessDenied"));
const NotFoundPage = lazy(() => import("@pages/dynamic/NotFound"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ACCESS_DENIED_PATH,
        element: <AccessDeniedPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: DASHBOARD_PATH,
            element: (
              <PermissionGuard
                permissions={["dashboard:view"]}
                redirectTo={ACCESS_DENIED_PATH}
              >
                <DashboardPage />
              </PermissionGuard>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const defaultContainerResolver = (): HTMLElement =>
  document.getElementById(PORTAL_DESTINATION_ID) ?? document.body;

export const App: React.FC = () => {
  return (
    <QueryClientProvider>
      <DirectionProvider>
        <PortalConfigProvider
          config={{ resolveContainer: defaultContainerResolver }}
        >
          <Dashboard.components.Initializer>
            <AccessControlProvider>
              <NuqsAdapter>
                <RouterProvider router={router} />
                <AlertDialogController />
                <div
                  id={PORTAL_DESTINATION_ID}
                  data-portal-destination=""
                  tabIndex={-1}
                >
                  <Toaster />
                </div>
              </NuqsAdapter>
            </AccessControlProvider>
          </Dashboard.components.Initializer>
        </PortalConfigProvider>
      </DirectionProvider>
    </QueryClientProvider>
  );
};
