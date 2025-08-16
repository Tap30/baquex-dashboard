import { cn, useMediaQuery } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import { ClickableArea } from "../../blocks/index.ts";
import { BreadcrumbProvider } from "./BreadcrumbContext/index.ts";
import { Header, Sidebar } from "./components/index.ts";
import classes from "./styles.module.css";

export const DashboardLayout: React.FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 786px)");
  const [isNavOpen, setIsNavOpen] = useState(true);

  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsNavOpen(!isMobile);
  }, [isMobile]);

  const toggleNav = () => {
    setIsNavOpen(o => !o);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <main
      ref={rootRef}
      className={cn(classes["root"], {
        [classes["nav-open"]!]: isNavOpen,
        [classes["mobile"]!]: isMobile,
      })}
    >
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
      {isMobile && isNavOpen && (
        <ClickableArea onClick={closeNav}>
          <div className={classes["overlay"]}></div>
        </ClickableArea>
      )}
      <Sidebar
        className={classes["sidebar"]}
        open={isNavOpen}
      />
    </main>
  );
};
