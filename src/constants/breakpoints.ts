export const BREAKPOINT_KEYS = ["xs", "sm", "md", "lg", "xl"] as const;

export const BreakpointStopValue = {
  xs: 640,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
} as const satisfies Record<(typeof BREAKPOINT_KEYS)[number], number>;
