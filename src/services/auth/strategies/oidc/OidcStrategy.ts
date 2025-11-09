import {
  UserManager,
  WebStorageStateStore,
  type User,
  type UserManagerSettings,
} from "oidc-client-ts";
import type { AuthenticatedUser } from "../../types.ts";
import { AuthStrategy, type SigninParams } from "../Strategy.ts";
import { HybridOidcStorage } from "./HybridOidcStorage.ts";
import { OIDC_STORE_PREFIX } from "./constants.ts";

const userStore = new WebStorageStateStore({
  store: new HybridOidcStorage(),
  prefix: OIDC_STORE_PREFIX,
});

const stateStore = new WebStorageStateStore({
  store: sessionStorage,
});

export class OidcStrategy extends AuthStrategy {
  private readonly _userManager: UserManager;
  private readonly _settings: UserManagerSettings;

  constructor(oidcSettings: UserManagerSettings) {
    super();

    const settings: UserManagerSettings = {
      userStore,
      stateStore,
      ...oidcSettings,
    };

    this._settings = settings;
    this._userManager = new UserManager(settings);
  }

  private _constructAuthenticatedUser(user: User): AuthenticatedUser {
    const fullName =
      user.profile.given_name && user.profile.family_name
        ? `${user.profile.given_name} ${user.profile.family_name}`
        : user.profile.given_name;

    return {
      id: user.profile.sub,
      name:
        user.profile.name ||
        fullName ||
        user.profile["nickname"] ||
        user.profile["middle_name"] ||
        user.profile["preferred_username"] ||
        (user.profile["display_name"] as string | undefined) ||
        (user.profile["username"] as string | undefined),
      email: user.profile.email,
      token: user.access_token,
      tokenType: user.token_type || "Bearer",
      expiresAt: user.expires_at ?? Number.MAX_SAFE_INTEGER,
      state: user.state as AuthenticatedUser["state"],
    };
  }

  public async getUser(): Promise<AuthenticatedUser | null> {
    try {
      const user = await this._userManager.getUser();

      if (!user) return null;

      return this._constructAuthenticatedUser(user);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      return null;
    }
  }

  public async handleSigninRedirectCallback(): Promise<AuthenticatedUser | null> {
    try {
      const user = await this._userManager.signinCallback();

      if (!user) return null;

      const authenticatedUser = this._constructAuthenticatedUser(user);

      return authenticatedUser;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      return null;
    }
  }

  public async handleSignoutRedirectCallback(): Promise<void> {
    const response = await this._userManager.signoutCallback();

    if (!response) return;
    if (!response.error) return;

    const { error, error_description, error_uri } = response;

    // eslint-disable-next-line no-console
    console.error(response);

    throw new Error(`[${error}] ${error_description} (${error_uri}).`);
  }

  public signin(params?: SigninParams): Promise<void> {
    return this._userManager.signinRedirect({
      state: {
        returnUrl: params?.returnUrl,
      },
    });
  }

  public async signout(): Promise<void> {
    return this._userManager.signoutRedirect();
  }

  public async checkScopeAccess(): Promise<boolean> {
    try {
      const user = await this._userManager.getUser();

      if (!user) return false;

      const REQUIRED_SCOPES = this._settings.scope
        ? this._settings.scope.split(" ")
        : [];

      return REQUIRED_SCOPES.every(scope => user.scopes.includes(scope));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      return false;
    }
  }

  public async refreshToken(): Promise<AuthenticatedUser | null> {
    try {
      const user = await this._userManager.signinSilent();

      if (!user) return null;

      return this._constructAuthenticatedUser(user);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      return null;
    }
  }
}
