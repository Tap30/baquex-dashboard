import { BreadcrumbProvider } from "@components/Breadcrumb";
import { ClickableArea } from "@components/ClickableArea";
import { SuspenseFallback } from "@components/SuspenseFallback";
import { Dashboard, type DashboardData } from "@entities/dashboard";
import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { mediaQueryDown } from "@utils/breakpoints";
import { cn } from "@utils/cn";
import { useAnnounceErrors } from "@utils/use-announce-errors";
import { useIsInitialFetch } from "@utils/use-is-initial-fetch";
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

  const queryResult = Dashboard.queries.useDashboardQuery({});

  const qc = useQueryClient();

  const { error } = queryResult;

  useAnnounceErrors([error]);

  const isInitialFetch = useIsInitialFetch(queryResult);

  useEffect(() => {
    const unsubscribe = qc.getQueryCache().subscribe(event => {
      const initQueryKey = Dashboard.queryKeys.dashboardQueryKeys.init({});

      const queryKey = event.query.queryKey as QueryKey;

      if (
        (event.type === "added" ||
          event.type === "updated" ||
          event.type === "observerAdded" ||
          event.type === "observerResultsUpdated" ||
          event.type === "observerOptionsUpdated") &&
        queryKey.join(",") === initQueryKey.join(",")
      ) {
        const data = event.query.state.data as DashboardData | undefined;

        if (data) {
          // update the dashboard store
        } else {
          // reset the dashboard store
        }
      }
    });

    return unsubscribe;
  }, [qc]);

  useEffect(() => {
    setIsNavOpen(!isMobile);
  }, [isMobile]);

  const toggleNav = () => {
    setIsNavOpen(o => !o);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const renderTree = () => {
    if (isInitialFetch) return <SuspenseFallback />;

    return (
      <BreadcrumbProvider>
        <Header
          className={classes["header"]}
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
        />
        <Outlet />
      </BreadcrumbProvider>
    );
  };

  return (
    <main
      ref={rootRef}
      className={cn(classes["root"], {
        [classes["nav-open"]!]: isNavOpen,
        [classes["mobile"]!]: isMobile,
      })}
    >
      <section className={classes["content"]}>{renderTree()}</section>
      {isMobile && isNavOpen && (
        <ClickableArea onClick={closeNav}>
          <div className={classes["overlay"]}></div>
        </ClickableArea>
      )}
      <Sidebar className={classes["sidebar"]} />
    </main>
  );
};
