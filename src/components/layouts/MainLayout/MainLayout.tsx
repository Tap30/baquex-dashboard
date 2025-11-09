import { PageLoading } from "@components/PageLoading";
import { SuspenseFallback } from "@components/SuspenseFallback";
import { useAuth } from "@services/auth";
import { useSyncWithPageLoader } from "@stores/page-loader";
import { globalNavigator } from "@utils/navigator";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router";
import classes from "./styles.module.css";

export const MainLayout: React.FC = () => {
  const { isAuthenticating } = useAuth();

  const isPageLoading = useSyncWithPageLoader(isAuthenticating);

  globalNavigator.setInstance(useNavigate());

  return (
    <div className={classes["root"]}>
      <PageLoading loading={isPageLoading} />
      <Suspense fallback={<SuspenseFallback />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
