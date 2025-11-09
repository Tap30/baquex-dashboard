import { AuthProvider } from "@services/auth";
import { authClient } from "./client.ts";

type Props = React.PropsWithChildren;

export const AuthClientProvider: React.FC<Props> = props => {
  const { children } = props;

  return <AuthProvider client={authClient}>{children}</AuthProvider>;
};
