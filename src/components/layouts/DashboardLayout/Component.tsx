import { Outlet } from "react-router";
import { Footer, Header, SideBar } from "./components/index.ts";
import classes from "./styles.module.css";

export const DashboardLayout: React.FC = () => {
  return (
    <>
      <Header className={classes["header"]} />
      <main className={classes["main"]}>
        <SideBar className={classes["sideBar"]} />
        <Outlet />
      </main>
      <Footer className={classes["footer"]} />
    </>
  );
};
