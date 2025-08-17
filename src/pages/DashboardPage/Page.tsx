import { strings } from "@/static-content";
import { usePageBreadcrumb } from "@/utils/use-page-breadcrumb";
import classes from "./styles.module.css";

export const DashboardPage: React.FC = () => {
  usePageBreadcrumb({
    title: strings.pages.dashboard.title,
    href: "/",
  });

  return <section className={classes["root"]}></section>;
};
