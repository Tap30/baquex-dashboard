import appConfig from "@config";
import { isDevelopment } from "@constants/env";
import { Languages } from "@constants/languages";
import { QueryClientProvider as QCP } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { queryClient } from "./client.ts";

type Props = React.PropsWithChildren;

type Position = NonNullable<
  React.ComponentProps<typeof ReactQueryDevtools>["buttonPosition"]
>;

const renderDevtools = () => {
  if (!isDevelopment) return null;

  const POSITION: Position =
    appConfig.language === Languages.FA ? "bottom-left" : "bottom-right";

  return <ReactQueryDevtools buttonPosition={POSITION} />;
};

export const QueryClientProvider: React.FC<Props> = props => {
  const { children } = props;

  return (
    <QCP client={queryClient}>
      {children}
      {renderDevtools()}
    </QCP>
  );
};
