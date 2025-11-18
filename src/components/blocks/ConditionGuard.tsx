export type ConditionGuardProps = {
  /**
   * Boolean condition that determines whether to render children or fallback.
   * When `true`, renders children; when `false`, renders fallback.
   */
  condition: boolean;

  /**
   * Content to render when the condition is `true`.
   */
  children: React.ReactNode;

  /**
   * Optional content to render when the condition is `false`.
   * If not provided, renders `null` (nothing).
   */
  fallback?: React.ReactNode;
};

/**
 * A conditional rendering component that displays children or fallback content
 * based on a boolean condition.
 *
 * @example
 * ```tsx
 * <ConditionGuard condition={isLoggedIn} fallback={<LoginForm />}>
 *   <Dashboard />
 * </ConditionGuard>
 * ```
 */
export const ConditionGuard: React.FC<ConditionGuardProps> = props => {
  const { children, condition, fallback = null } = props;

  if (!condition) return <>{fallback}</>;

  return <>{children}</>;
};
