import type { AuthenticatedUser } from "./types.ts";

export abstract class AuthStrategy {
  /**
   * This method processes the callback after a user is redirected back to the
   * application following a successful sign-in.
   * It's crucial for stateful authentication flows like OIDC.
   *
   * @returns A promise that resolves to an `AuthenticatedUser` object if a user
   * session is successfully established, or `null` if the process fails.
   */
  public abstract handleSigninRedirectCallback(): Promise<AuthenticatedUser | null>;

  /**
   * This method handles the post-logout callback from an identity provider.
   * It's responsible for any cleanup required after a user has been redirected
   * away and then back to the application.
   *
   * @returns A promise that resolves when the sign-out process is complete.
   */
  public abstract handleSignoutRedirectCallback(): Promise<void>;

  /**
   * Performs a login operation. This can involve a redirect to an
   * identity provider (e.g., OIDC) or a direct API call (e.g., credentials).
   *
   * @returns A promise that resolves when the login is complete.
   */
  public abstract signin(credentials?: unknown): Promise<void>;

  /**
   * Performs a logout operation. This can involve a redirect or a direct API call.
   *
   * @returns A promise that resolves when the logout is complete.
   */
  public abstract signout(): Promise<void>;

  /**
   * Retrieves the currently authenticated user's information.
   *
   * @returns A promise that resolves with the user object, or null if no user is authenticated.
   */
  public abstract getUser(): Promise<AuthenticatedUser | null>;

  /**
   * Checks the user's scopes to determine if they have access to the application.
   *
   * @returns A boolean indicating whether the user has the required scopes.
   */
  public abstract checkScopeAccess(): Promise<boolean>;
}
