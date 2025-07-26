import { useState } from "react";
import { Outlet } from "react-router";
import { BreadcrumbProvider } from "./BreadcrumbContext/index.ts";
import { Header, Sidebar } from "./components/index.ts";
import classes from "./styles.module.css";

export const DashboardLayout: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const toggleNav = () => {
    setIsNavOpen(o => !o);
  };

  return (
    <main className={classes["root"]}>
      <Sidebar
        className={classes["sidebar"]}
        open={isNavOpen}
      />
      <section className={classes["content"]}>
        <BreadcrumbProvider>
          <Header
            className={classes["header"]}
            isNavOpen={isNavOpen}
            toggleNav={toggleNav}
          />
          <Outlet />
        </BreadcrumbProvider>
      </section>
    </main>
  );
};
