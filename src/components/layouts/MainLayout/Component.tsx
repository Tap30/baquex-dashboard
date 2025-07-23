import { Outlet } from "react-router";
import classes from "./styles.module.css";

export const MainLayout: React.FC = () => {
  return (
    <div className={classes["root"]}>
      <Outlet />
    </div>
  );
};
