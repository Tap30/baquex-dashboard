import { memoryStorage, type DataStorage } from "@services/storage";
import type { User } from "oidc-client-ts";
import { OIDC_STORE_PREFIX } from "./constants.ts";

/**
 * Hybrid storage for OIDC that stores access tokens in memory
 * and other tokens in localStorage for persistence.
 */
export class HybridOidcStorage implements DataStorage {
  private _memoryStorage = memoryStorage;
  private _localStorage = localStorage;

  private _isUserKey(key: string): boolean {
    return key.startsWith(`${OIDC_STORE_PREFIX}user:`);
  }

  private _removeAccessToken(userData: string): string {
    try {
      const parsed = JSON.parse(userData) as User;
      const { access_token: _, ...rest } = parsed;

      return JSON.stringify(rest);
    } catch {
      return userData;
    }
  }

  private _getAccessToken(userData: string): string | null {
    try {
      const parsed = JSON.parse(userData) as User;

      return parsed.access_token || null;
    } catch {
      return null;
    }
  }

  public setItem<T>(key: string, value: T): void {
    if (this._isUserKey(key)) {
      const userDataString = value as string;
      const accessToken = this._getAccessToken(userDataString);

      if (accessToken) {
        this._memoryStorage.setItem(`${key}:access_token`, accessToken);
      }

      const dataWithoutAccessToken = this._removeAccessToken(userDataString);

      this._localStorage.setItem(key, dataWithoutAccessToken);
    } else {
      this._localStorage.setItem(key, value as string);
    }
  }

  public getItem<T>(key: string): T | null {
    if (this._isUserKey(key)) {
      const item = this._localStorage.getItem(key);

      if (item === null) return null;

      try {
        const userData = JSON.parse(item) as Partial<User>;
        const accessToken = this._memoryStorage.getItem<string>(
          `${key}:access_token`,
        );

        if (accessToken) {
          userData.access_token = accessToken;
        }

        return JSON.stringify(userData) as T;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(
          `HybridOidcStorage: Failed to parse item for key "${key}"`,
          e,
        );
        return null;
      }
    }

    return this._localStorage.getItem(key) as T;
  }

  public removeItem(key: string): void {
    if (this._isUserKey(key)) {
      this._memoryStorage.removeItem(`${key}:access_token`);
      this._localStorage.removeItem(key);
    } else {
      this._localStorage.removeItem(key);
    }
  }

  public clear(): void {
    this._memoryStorage.clear();
    this._localStorage.clear();
  }

  public get length(): number {
    return this._memoryStorage.length + this._localStorage.length;
  }

  public key(index: number): string | null {
    const memoryKeys = Array.from(
      { length: this._memoryStorage.length },
      (_, i) => this._memoryStorage.key(i),
    ).filter(Boolean) as string[];

    if (index < memoryKeys.length) {
      return memoryKeys[index] ?? null;
    }

    return this._localStorage.key(index - memoryKeys.length);
  }
}
