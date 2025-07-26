export const Languages = {
  FA: "FA",
  EN: "EN",
} as const;

export const DEFAULT_LANGUAGE: (typeof Languages)[keyof typeof Languages] =
  "FA";
