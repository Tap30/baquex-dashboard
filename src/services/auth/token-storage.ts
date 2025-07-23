import { persistedStorage } from "../storage/index.ts";
import { AUTH_TOKEN_KEY } from "./constants.ts";

class TokenStorage {
  public setToken(token: string) {
    persistedStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  public deleteToken() {
    persistedStorage.removeItem(AUTH_TOKEN_KEY);
  }

  public getToken() {
    return persistedStorage.getItem<string>(AUTH_TOKEN_KEY);
  }
}

export const tokenStorage = new TokenStorage();
