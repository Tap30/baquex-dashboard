import { strings } from "@/static-content";
import { usePageBreadcrumb } from "@/utils";
import { useLoaderData } from "react-router";
import classes from "./styles.module.css";
import { type PageLoaderData } from "./types.ts";

export const DashboardPage: React.FC = () => {
  const data = useLoaderData<PageLoaderData>();

  usePageBreadcrumb({
    title: strings.sidebar.dashboard,
    href: "/",
  });

  return <section className={classes["root"]}></section>;
};
