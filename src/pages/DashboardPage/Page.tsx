import { useBreadcrumb, type BreadcrumbItem } from "@/components";
import { strings } from "@/static-content";
import { useEffect } from "react";
import { useLoaderData } from "react-router";
import classes from "./styles.module.css";
import { type PageLoaderData } from "./types.ts";

export const DashboardPage: React.FC = () => {
  const data = useLoaderData<PageLoaderData>();

  const { addCrumb, removeCrumb } = useBreadcrumb();

  useEffect(() => {
    const crumb: BreadcrumbItem = {
      title: strings.sidebar.dashboard,
      href: "/",
    };

    addCrumb(crumb);

    return () => {
      removeCrumb(crumb);
    };
  }, [addCrumb, removeCrumb]);

  return <section className={classes["root"]}></section>;
};
