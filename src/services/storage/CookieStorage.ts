import type { IStorage } from "./types.ts";

/**
 * Represents a storage solution using browser cookies.
 */
export class CookieStorage implements IStorage {
  private _getCookies(): Map<string, string> {
    const cookies = document.cookie.split("; ").reduce((result, cookie) => {
      const parts = cookie.split("=");

      if (parts.length === 2) {
        result.set(
          decodeURIComponent(parts[0]!),
          decodeURIComponent(parts[1]!),
        );
      }

      return result;
    }, new Map<string, string>());

    return cookies;
  }

  public setItem<T>(
    key: string,
    value: T,
    options?: {
      expires?: Date | number;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: "Strict" | "Lax" | "None";
    },
  ): void {
    try {
      let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;

      if (options?.expires) {
        let expiryDate: Date;

        if (typeof options.expires === "number") {
          expiryDate = new Date();
          // expires in seconds
          expiryDate.setTime(expiryDate.getTime() + options.expires * 1000);
        } else {
          expiryDate = options.expires;
        }

        cookieString += `; expires=${expiryDate.toUTCString()}`;
      }

      if (options?.path) {
        cookieString += `; path=${options.path}`;
      }

      if (options?.domain) {
        cookieString += `; domain=${options.domain}`;
      }

      if (options?.secure) {
        cookieString += `; secure`;
      }

      if (options?.sameSite) {
        cookieString += `; SameSite=${options.sameSite}`;
      }

      document.cookie = cookieString;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`CookieStorage: Failed to set item for key "${key}"`, e);
    }
  }

  public getItem<T>(key: string): T | null {
    const cookies = this._getCookies();
    const item = cookies.get(key);

    if (item === undefined) return null;

    try {
      return JSON.parse(item) as T;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`CookieStorage: Failed to parse item for key "${key}"`, e);

      return null;
    }
  }

  public removeItem(
    key: string,
    options?: { path?: string; domain?: string },
  ): void {
    // To remove a cookie, set its expiration date to a past date.
    let cookieString = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;

    if (options?.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options?.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    document.cookie = cookieString;
  }

  public clear(): void {
    // This is not directly supported by document.cookie.
    // Iterating and removing each cookie is generally not recommended for security/performance.
    // For specific use cases, we might want to remove only cookies set by our application.

    // eslint-disable-next-line no-console
    console.warn(
      "CookieStorage: 'clear()' method is not fully supported for cookies. Manually removing all might have unintended side effects.",
    );

    this._getCookies().forEach((_, key) => this.removeItem(key));
  }

  public get length(): number {
    return this._getCookies().size;
  }

  public key(index: number): string | null {
    const keys = Array.from(this._getCookies().keys());

    return keys[index] || null;
  }
}
