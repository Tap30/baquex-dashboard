import { QueryClientProvider as QCP } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { queryClient } from "./client.ts";

type Props = React.PropsWithChildren;

export const QueryClientProvider: React.FC<Props> = props => {
  const { children } = props;

  return (
    <QCP client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QCP>
  );
};
