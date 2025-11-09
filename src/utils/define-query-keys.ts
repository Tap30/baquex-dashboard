// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QueryKey } from "@tanstack/react-query";

type UnknownObject = Record<PropertyKey, unknown>;

type QueryKeySegment =
  | string
  | number
  | boolean
  | UnknownObject
  | null
  | undefined;

const isValidQueryKeyPart = (
  key: unknown,
): key is NonNullable<QueryKeySegment> => {
  return key !== undefined && key !== null;
};

type KeySegmentCreatorWithParams<T extends UnknownObject> = (
  params: T,
) => QueryKeySegment | QueryKeySegment[];

type KeySegmentCreatorWithoutParams = () => QueryKeySegment | QueryKeySegment[];

/**
 * Function signature for creating query key segments.
 * Supports both parameterized functions that take an object parameter
 * and parameterless functions for simple key generation.
 *
 * @template T The type of parameters object expected by parameterized creators
 */
export type KeySegmentCreator<T extends UnknownObject> =
  | KeySegmentCreatorWithParams<T>
  | KeySegmentCreatorWithoutParams;

/**
 * Mapped type that transforms a record of KeySegmentCreator functions
 * into a factory object with type-safe method signatures.
 *
 * Automatically detects parameterless functions and makes their calls parameter-free,
 * while maintaining parameter requirements for functions that need them.
 *
 * @template T Record of KeySegmentCreator functions with their parameter types
 */
export type QueryKeyFactory<T extends Record<string, KeySegmentCreator<any>>> =
  Readonly<
    {
      /**
       * Mapped methods that generate domain-prefixed query keys.
       */
      [K in keyof T]: T[K] extends () => any
        ? () => QueryKey
        : T[K] extends KeySegmentCreator<infer P>
          ? (params: P) => QueryKey
          : never;
    } & {
      /**
       * Base query key containing only the domain identifier.
       * This represents the root key for all queries in this domain.
       */
      all: QueryKey;
    }
  >;

/**
 * Creates a type-safe factory for generating consistent, domain-prefixed TanStack Query keys.
 *
 * This function provides a structured approach to query key management by:
 * - Ensuring all keys share a common domain prefix for consistency
 * - Providing compile-time type safety for parameter validation
 * - Automatically filtering out invalid key segments (null/undefined)
 * - Creating an immutable factory object to prevent accidental modification
 * - Supporting both parameterized and parameterless key creators
 *
 * @template T Record type mapping creator function names to their implementations
 * @param domain The root identifier that will prefix all generated query keys
 * @param creators Object containing named functions that generate key segments
 * @returns Immutable factory object with 'all' property and typed creator methods
 *
 * @example
 * ```typescript
 * // Define query keys with mixed parameter requirements
 * const userKeys = defineQueryKeys('users', {
 *   // Parameterless function - can be called without arguments
 *   list: () => ['list'],
 *   // Parameterized function - requires specific parameters
 *   byId: (params: { id: string }) => ['detail', params.id],
 *   // Function with optional filters
 *   filtered: (params: { filters?: Record<string, unknown> }) => ['list', params.filters]
 * })
 *
 * // Usage examples:
 * userKeys.all           // ['users'] - base domain key
 * userKeys.list()        // ['users', 'list'] - no parameters needed
 * userKeys.byId({ id: '123' })  // ['users', 'detail', '123'] - parameters required
 * userKeys.filtered({ filters: { active: true } })  // ['users', 'list', { active: true }]
 * ```
 */
export const defineQueryKeys = <
  T extends Record<string, KeySegmentCreator<any>>,
>(
  domain: string,
  creators: T,
): QueryKeyFactory<T> => {
  const allKey: QueryKey = [domain];

  const result = {
    all: allKey,
  } as QueryKeyFactory<T>;

  for (const creatorName in creators) {
    // Verify that the property exists directly on the creators object
    // and is not inherited from the prototype chain.
    if (Object.prototype.hasOwnProperty.call(creators, creatorName)) {
      const creatorFn = creators[creatorName]!;

      const factoryMethod = (params?: UnknownObject): QueryKey => {
        const keySegment =
          creatorFn.length === 0
            ? (creatorFn as KeySegmentCreatorWithoutParams)()
            : (creatorFn as KeySegmentCreatorWithParams<UnknownObject>)(
                params ?? {},
              );

        // Normalize the key segment to array format for consistent processing.
        const keySegmentArray: QueryKeySegment[] = Array.isArray(keySegment)
          ? keySegment
          : [keySegment];

        const combinedKey = [...allKey, ...keySegmentArray];

        // Filter out any null or undefined values to ensure query key validity.
        // TanStack Query requires all key segments to be non-nullish.
        const filteredKey: QueryKey = combinedKey.filter(isValidQueryKeyPart);

        return filteredKey;
      };

      (result as Record<string, typeof factoryMethod>)[creatorName] =
        factoryMethod;
    }
  }

  return Object.freeze(result);
};
