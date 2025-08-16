import {
  AuthLayout,
  DashboardLayout,
  MainLayout,
  ProtectedRoute,
} from "@/components";
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  SIGNIN_CALLBACK_PATH,
  UNAUTHORIZED_PATH,
} from "@/constants";
import { AuthProvider } from "@/contexts";
import {
  AccessDeniedPage,
  dashboardLoader,
  DashboardPage,
  LoginPage,
  NotFoundPage,
  SigninCallbackPage,
} from "@/pages";
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
