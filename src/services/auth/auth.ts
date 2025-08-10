// auth-service.ts
import { OidcStrategy } from "./OidcStrategy.ts";
import type { AuthStrategy } from "./Strategy.ts";
import type { AuthenticatedUser } from "./types.ts";

class AuthService {
  private readonly _strategy: AuthStrategy;

  constructor(strategy: AuthStrategy) {
    this._strategy = strategy;
  }

  public handleSigninRedirectCallback(): Promise<AuthenticatedUser | null> {
    return this._strategy.handleSigninRedirectCallback();
  }

  public handleSignoutRedirectCallback(): Promise<void> {
    return this._strategy.handleSignoutRedirectCallback();
  }

  public signin(): Promise<void> {
    return this._strategy.signin();
  }

  public signout(): Promise<void> {
    return this._strategy.signout();
  }

  public getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
    return this._strategy.getUser();
  }

  public async checkScopeAccess(): Promise<boolean> {
    return this._strategy.checkScopeAccess();
  }
}

export const auth = new AuthService(new OidcStrategy());
