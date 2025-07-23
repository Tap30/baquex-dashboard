import type { IStorage } from "./types.ts";

/**
 * Represents a wrapper for the Web Storage API (localStorage or sessionStorage).
 */
export class WebStorage implements IStorage {
  private _storage: Storage;

  public static PersistenceLevels = {
    SESSION: "SESSION",
    ALWAYS: "ALWAYS",
  } as const;

  constructor(
    persistenceLevel: (typeof WebStorage.PersistenceLevels)[keyof typeof WebStorage.PersistenceLevels],
  ) {
    if (persistenceLevel === WebStorage.PersistenceLevels.SESSION) {
      this._storage = window.sessionStorage;
    } else {
      this._storage = window.localStorage;
    }
  }

  public setItem<T>(key: string, value: T): void {
    try {
      this._storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`WebStorage: Failed to set item for key "${key}"`, e);

      // For localStorage/sessionStorage, this can happen if storage quota is exceeded.
      // We might want to implement more sophisticated error handling here.
    }
  }

  public getItem<T>(key: string): T | null {
    const item = this._storage.getItem(key);

    if (item === null) return null;

    try {
      return JSON.parse(item) as T;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`WebStorage: Failed to parse item for key "${key}"`, e);

      return null;
    }
  }

  public removeItem(key: string): void {
    this._storage.removeItem(key);
  }

  public clear(): void {
    this._storage.clear();
  }

  public length(): number {
    return this._storage.length;
  }

  public key(index: number): string | null {
    return this._storage.key(index);
  }
}
