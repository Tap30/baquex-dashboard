import { CookieStorage } from "./CookieStorage.ts";
import { MemoryStorage } from "./MemoryStorage.ts";
import type { DataStorage } from "./types.ts";
import { WebStorage } from "./WebStorage.ts";

const isBrowser = typeof window !== "undefined";

export const memoryStorage: DataStorage = new MemoryStorage();

export const persistedStorage: DataStorage = isBrowser
  ? new WebStorage(WebStorage.PersistenceLevels.ALWAYS)
  : new MemoryStorage();

export const sessionPersistedStorage: DataStorage = isBrowser
  ? new WebStorage(WebStorage.PersistenceLevels.SESSION)
  : new MemoryStorage();

export const cookieStorage: DataStorage = isBrowser
  ? new CookieStorage()
  : new MemoryStorage();
