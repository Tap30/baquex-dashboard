import type { AuthenticatedUser } from "../types.ts";
import { AuthStrategy } from "./Strategy.ts";

const USER: AuthenticatedUser = {
  expiresAt: Infinity,
  id: "ID",
  token: "TOKEN",
  tokenType: "Bearer",
};

export class NullStrategy extends AuthStrategy {
  public override handleSigninRedirectCallback(): Promise<AuthenticatedUser | null> {
    return Promise.resolve(USER);
  }

  public override handleSignoutRedirectCallback(): Promise<void> {
    return Promise.resolve();
  }

  public override signin(_credentials?: unknown): Promise<void> {
    return Promise.resolve();
  }

  public override signout(): Promise<void> {
    return Promise.resolve();
  }

  public override getUser(): Promise<AuthenticatedUser | null> {
    return Promise.resolve(USER);
  }

  public override checkScopeAccess(): Promise<boolean> {
    return Promise.resolve(true);
  }

  public override refreshToken(): Promise<AuthenticatedUser | null> {
    return Promise.resolve(USER);
  }
}
