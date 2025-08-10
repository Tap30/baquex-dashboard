import type { IStorage } from "./types.ts";

/**
 * Represents an in-memory storage solution.
 * Data is lost when the page refreshes.
 */
export class MemoryStorage implements IStorage {
  private _store: Map<string, string> = new Map();

  public setItem<T>(key: string, value: T): void {
    try {
      this._store.set(key, JSON.stringify(value));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`MemoryStorage: Failed to set item for key "${key}"`, e);
    }
  }

  public getItem<T>(key: string): T | null {
    const item = this._store.get(key);

    if (item === undefined) return null;

    try {
      return JSON.parse(item) as T;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`MemoryStorage: Failed to parse item for key "${key}"`, e);

      return null;
    }
  }

  public removeItem(key: string): void {
    this._store.delete(key);
  }

  public clear(): void {
    this._store.clear();
  }

  public get length(): number {
    return this._store.size;
  }

  public key(index: number): string | null {
    const keys = Array.from(this._store.keys());

    return keys[index] || null;
  }
}
