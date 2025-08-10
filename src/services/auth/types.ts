export type AuthenticatedUser = {
  id: string;
  name?: string;
  email?: string;
  token: string;
  tokenType: "Bearer";
  expiresAt: number;
};
