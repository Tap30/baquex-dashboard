export interface IStorage {
  /**
   * Sets an item in storage.
   *
   * @param key The key under which to store the item.
   * @param value The value to store. Can be any serializable type.
   */
  setItem<T>(key: string, value: T): void;

  /**
   * Retrieves an item from storage.
   *
   * @param key The key of the item to retrieve.
   * @returns The retrieved value, or null if not found.
   */
  getItem<T>(key: string): T | null;

  /**
   * Removes an item from storage.
   *
   * @param key The key of the item to remove.
   */
  removeItem(key: string): void;

  /**
   * Clears all items from storage.
   */
  clear(): void;

  /**
   * Gets the number of items in storage.
   */
  length: number;

  /**
   * Gets the key at a specific index.
   *
   * @param index The index of the key to retrieve.
   */
  key(index: number): string | null;
}
