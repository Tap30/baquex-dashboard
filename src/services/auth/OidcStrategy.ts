import { Env } from "@/constants";
import {
  UserManager,
  WebStorageStateStore,
  type User,
  type UserManagerSettings,
} from "oidc-client-ts";
import { persistedStorage } from "../storage/storage.ts";
import { AuthStrategy } from "./Strategy.ts";
import type { AuthenticatedUser } from "./types.ts";

const OIDC_SETTINGS = {
  userStore: new WebStorageStateStore({
    store: persistedStorage,
  }),
  client_id: Env.VITE_OIDC_CLIENT_ID ?? "",
  authority: Env.VITE_OIDC_AUTHORITY ?? "",
  redirect_uri: Env.VITE_OIDC_REDIRECT_URI ?? "",
  client_secret: Env.VITE_OIDC_CLIENT_SECRET ?? undefined,
  scope: Env.VITE_OIDC_SCOPE ?? undefined,
  response_type: "code",
  automaticSilentRenew: true,
  filterProtocolClaims: true,
} as const satisfies UserManagerSettings;

const REQUIRED_SCOPES = OIDC_SETTINGS.scope
  ? OIDC_SETTINGS.scope.split(" ")
  : [];

export class OidcStrategy extends AuthStrategy {
  private readonly _userManager: UserManager;

  constructor() {
    super();

    this._userManager = new UserManager(OIDC_SETTINGS);
  }

  private _constructAuthenticatedUser(user: User): AuthenticatedUser {
    return {
      id: user.profile.sub,
      name: user.profile.name,
      email: user.profile.email,
      token: user.access_token,
      tokenType: "Bearer",
      expiresAt: user.expires_at ?? Number.MAX_SAFE_INTEGER,
    };
  }

  public async getUser(): Promise<AuthenticatedUser | null> {
    const user = await this._userManager.getUser();

    if (!user) return null;

    return this._constructAuthenticatedUser(user);
  }

  public async handleSigninRedirectCallback(): Promise<AuthenticatedUser | null> {
    const user = await this._userManager.signinCallback();

    if (!user) return null;

    return this._constructAuthenticatedUser(user);
  }

  public async handleSignoutRedirectCallback(): Promise<void> {
    const response = await this._userManager.signoutCallback();

    if (!response) return;
    if (!response.error) return;

    throw new Error(response.error);
  }

  public async signin(): Promise<void> {
    return this._userManager.signinRedirect();
  }

  public async signout(): Promise<void> {
    return this._userManager.signoutRedirect();
  }

  public async checkScopeAccess(): Promise<boolean> {
    const user = await this._userManager.getUser();

    if (!user) return false;

    return REQUIRED_SCOPES.every(scope => user.scopes.includes(scope));
  }
}
