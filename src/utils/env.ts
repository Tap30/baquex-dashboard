import z from "zod";

const envSchema = z.object({
  VITE_APP_HOSTNAME: z.string().optional(),
  VITE_APP_GRPC_GATEWAY: z.string().optional(),
  VITE_OIDC_AUTHORITY: z.string().optional(),
  VITE_OIDC_CLIENT_ID: z.string().optional(),
  VITE_OIDC_SCOPE: z.string().optional(),
});

// Validate env against the schema at runtime
const envResult = envSchema.safeParse(import.meta.env);

if (!envResult.success) {
  // eslint-disable-next-line no-console
  console.error(
    "Invalid environment variables:",
    JSON.stringify(z.treeifyError(envResult.error).properties, null, 2),
  );

  throw new Error(
    ["Invalid environment variables.", envResult.error.message].join(" | "),
  );
}

export type AppEnv = z.infer<typeof envSchema>;

const appEnv: AppEnv = envResult.data;

/**
 * A type-safe function to get environment variables.
 */
export function getAppEnv<K extends keyof AppEnv>(envKey: K): AppEnv[K];
export function getAppEnv<K extends keyof AppEnv, F>(
  envKey: K,
  fallback: F,
): NonNullable<AppEnv[K]> | F;
export function getAppEnv<K extends keyof AppEnv, F>(envKey: K, fallback?: F) {
  const envValue = appEnv[envKey];

  return envValue ?? fallback;
}
