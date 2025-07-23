import { CookieStorage } from "./CookieStorage.ts";
import { MemoryStorage } from "./MemoryStorage.ts";
import type { IStorage } from "./types.ts";
import { WebStorage } from "./WebStorage.ts";

const isBrowser = typeof window !== "undefined";

export const memoryStorage: IStorage = new MemoryStorage();

export const persistedStorage: IStorage = isBrowser
  ? new WebStorage(WebStorage.PersistenceLevels.ALWAYS)
  : new MemoryStorage();

export const sessionPersistedStorage: IStorage = isBrowser
  ? new WebStorage(WebStorage.PersistenceLevels.SESSION)
  : new MemoryStorage();

export const cookieStorage: IStorage = isBrowser
  ? new CookieStorage()
  : new MemoryStorage();
