import { Env } from "@/constants";

export const getEnv = <T extends keyof ImportMetaEnv>(
  name: T,
  required = false,
): ImportMetaEnv[T] => {
  const value = Env[name];

  if (required && value == null) {
    throw new Error(
      [
        `The environment variable "${name}" is required but was not set.,`,
        "Please ensure a valid value is provided.",
      ].join(" "),
    );
  }

  return value;
};
