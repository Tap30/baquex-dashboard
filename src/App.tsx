import {
  AuthLayout,
  DashboardLayout,
  MainLayout,
  ProtectedRoute,
} from "@/components";
import { DASHBOARD_PATH, LOGIN_PATH } from "@/constants";
import { AuthProvider } from "@/contexts";
import {
  dashboardLoader,
  DashboardPage,
  LoginPage,
  NotFoundPage,
} from "@/pages";
import { QueryClientProvider } from "@/services";
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
        ],
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
    <QueryClientProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
};
