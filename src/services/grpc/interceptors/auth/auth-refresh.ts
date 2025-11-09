import {
  Code,
  ConnectError,
  type Interceptor,
  type StreamRequest,
  type UnaryRequest,
} from "@connectrpc/connect";
import { type AuthenticatedUser } from "@services/auth";
import { authClient } from "@services/auth-service-client";

const setAuthorizationHeaders = (
  req: UnaryRequest | StreamRequest,
  user: AuthenticatedUser,
) => {
  req.header.set("Authorization", `${user.tokenType} ${user.token}`);
  req.header.set("X-Authorization", `${user.token}`);
};

export const authRefreshInterceptor: Interceptor = next => async req => {
  const user = await authClient.getAuthenticatedUser();

  if (user?.token) setAuthorizationHeaders(req, user);

  try {
    return await next(req);
  } catch (error) {
    if (error instanceof ConnectError && error.code === Code.Unauthenticated) {
      // Try to refresh token and retry once
      const refreshedUser = await authClient.refreshToken();

      if (refreshedUser?.token) {
        setAuthorizationHeaders(req, refreshedUser);

        return await next(req);
      }
    }

    throw error;
  }
};
