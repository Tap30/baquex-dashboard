import type { AuthStrategy, SigninParams } from "./strategies/Strategy.ts";
import type { AuthenticatedUser } from "./types.ts";

export class AuthenticationClient {
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

  public signin(params?: SigninParams): Promise<void> {
    return this._strategy.signin(params);
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

  public refreshToken(): Promise<AuthenticatedUser | null> {
    return this._strategy.refreshToken();
  }
}
