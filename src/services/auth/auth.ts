import { http } from "@/services";
import { LOGIN_ENDPOINT_PATH, LOGOUT_ENDPOINT_PATH } from "./constants.ts";
import { tokenStorage } from "./token-storage.ts";
import type { LoginCredentials } from "./types.ts";

class AuthService {
  public async login(credentials: LoginCredentials): Promise<boolean> {
    try {
      const response = await http.post<{ token: string }>(
        LOGIN_ENDPOINT_PATH,
        credentials,
      );

      if (response.success) {
        const { token } = response.data;

        tokenStorage.setToken(token);

        return true;
      } else {
        console.error("Login API error:", response.message);

        return false;
      }
    } catch (error) {
      console.error("Login request failed:", error);

      return false;
    }
  }

  public async logout(): Promise<void> {
    try {
      const response = await http.post(LOGOUT_ENDPOINT_PATH);

      if (response.success) {
        tokenStorage.deleteToken();
      } else {
        console.error("Logout API error:", response.message);
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    }
  }

  public get storage(): typeof tokenStorage {
    return tokenStorage;
  }
}

export const auth = new AuthService();
