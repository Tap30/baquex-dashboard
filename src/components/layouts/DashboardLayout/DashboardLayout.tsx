import { BreadcrumbProvider } from "@components/Breadcrumb";
import { ClickableArea } from "@components/ClickableArea";
import { mediaQueryDown } from "@utils/breakpoints";
import { cn } from "@utils/cn";
import { useMediaQuery } from "@utils/use-media-query";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import { Header, Sidebar } from "./components/index.internal.ts";
import classes from "./styles.module.css";

export const DashboardLayout: React.FC = () => {
  const [isMobile] = useMediaQuery(
    mediaQueryDown("sm", { excludeAtMedia: true }),
  );

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
      <Sidebar className={classes["sidebar"]} />
    </main>
  );
};
