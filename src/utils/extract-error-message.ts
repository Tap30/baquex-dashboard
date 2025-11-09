import { ConnectError } from "@connectrpc/connect";
import { strings } from "@static-content";

export const extractErrorMessage = (err: unknown): string => {
  if (err instanceof ConnectError) {
    return err.message;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return strings.genericError.description;
};
