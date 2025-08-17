import { AuthLayout } from "@components/AuthLayout";
import { DashboardLayout } from "@components/DashboardLayout";
import { MainLayout } from "@components/MainLayout";
import { ProtectedRoute } from "@components/ProtectedRoute";
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  SIGNIN_CALLBACK_PATH,
  UNAUTHORIZED_PATH,
} from "@constants/routes";
import { AuthProvider } from "@contexts/Auth";
import { AccessDeniedPage } from "@pages/AccessDeniedPage";
import { dashboardLoader, DashboardPage } from "@pages/DashboardPage";
import { LoginPage } from "@pages/LoginPage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { SigninCallbackPage } from "@pages/SigninCallbackPage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: LOGIN_PATH,
            element: <LoginPage />,
          },
          {
            path: SIGNIN_CALLBACK_PATH,
            element: <SigninCallbackPage />,
          },
        ],
      },
      {
        path: UNAUTHORIZED_PATH,
        element: <AccessDeniedPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: DASHBOARD_PATH,
                element: <DashboardPage />,
                loader: dashboardLoader,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
