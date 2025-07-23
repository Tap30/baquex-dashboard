import { Outlet } from "react-router";

export const AuthLayout: React.FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};
