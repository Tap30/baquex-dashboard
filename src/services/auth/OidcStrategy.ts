import { UNAUTHORIZED_PATH } from "@/constants";
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
  client_id: (import.meta.env["VITE_OIDC_CLIENT_ID"] as string) || "",
  authority: (import.meta.env["VITE_OIDC_AUTHORITY"] as string) || "",
  redirect_uri: (import.meta.env["VITE_OIDC_REDIRECT_URI"] as string) || "",
  client_secret: (import.meta.env["VITE_OIDC_CLIENT_SECRET"] as string) || "",
  response_type: (import.meta.env["VITE_OIDC_RESPONSE_TYPE"] as string) || "",
  scope: (import.meta.env["VITE_OIDC_SCOPE"] as string) || "",
  automaticSilentRenew: true,
  filterProtocolClaims: true,
} as const satisfies UserManagerSettings;

const REQUIRED_SCOPES = OIDC_SETTINGS.scope.split(" ");

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
    try {
      const user = await this._userManager.signinCallback();

      if (!user) return null;

      return this._constructAuthenticatedUser(user);
    } catch (e) {
      console.error(e);
      const queryParams = new URLSearchParams(window.location.search);
      const errorType = queryParams.get("error");

      switch (errorType) {
        case "access_denied":
          // TODO: udpate
          window.location.replace(UNAUTHORIZED_PATH);
          return null;
        default:
          return null;
      }
    }
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
