import { Outlet } from "react-router";
import { Sidebar } from "./components/index.ts";
import classes from "./styles.module.css";

export const DashboardLayout: React.FC = () => {
  return (
    <main className={classes["main"]}>
      <Sidebar className={classes["sidebar"]} />
      <Outlet />
    </main>
  );
};
