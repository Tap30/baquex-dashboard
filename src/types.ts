// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BREAKPOINT_KEYS } from "@constants/breakpoints";
import type { Languages } from "@constants/languages";
import type { stringifiedLocalDatetimeSchema } from "@constants/schemas";
import type { SidebarItemTypes } from "@constants/sidebar";
import {
  type FormApi,
  type FormOptions,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import type {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import type z from "zod";

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type OneOf<T extends any[]> = T[number] extends infer U
  ? U extends object
    ? {
        [K in keyof U]: U[K];
      } & {
        [K in Exclude<keyof UnionToIntersection<T[number]>, keyof U>]?: never;
      }
    : U
  : never;

export type Overwrite<T, U> = Omit<T, keyof U> & U;

export type MergeElementProps<
  E extends React.ElementType,
  P = object,
> = Overwrite<React.ComponentPropsWithRef<E>, P>;

export type MergeElementPropsWithOmitted<
  E extends React.ElementType,
  K extends keyof React.ComponentPropsWithRef<E>,
  P = object,
> = Overwrite<Omit<React.ComponentPropsWithRef<E>, K>, P>;

export type PolymorphicPropsWithOmitted<
  E extends React.ElementType,
  K extends keyof React.ComponentPropsWithRef<E>,
  P = object,
> = MergeElementPropsWithOmitted<
  E,
  K,
  P & {
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    as?: E;
  }
>;

export type PolymorphicProps<
  E extends React.ElementType,
  P = object,
> = MergeElementProps<
  E,
  P & {
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    as?: E;
  }
>;

export type WithBaseProps<P extends object> = P & {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * The classname of the component's root.
   */
  className?: string;
};

export type WithRef<P extends object, E extends React.ElementType> = P & {
  ref?: React.ComponentPropsWithRef<E>["ref"];
};

export type UrlParams<Url extends string> =
  Url extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof UrlParams<`/${Rest}`>]: string }
    : Url extends `${string}:${infer Param}`
      ? { [K in Param]: string }
      : object;

export type NarrowDiscriminatedUnionDown<
  Union extends Record<PropertyKey, any>,
  Key extends keyof Union,
  Value extends Union[Key],
> = Extract<Union, Record<Key, Value>>;

export type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

export type BreakpointKeys = (typeof BREAKPOINT_KEYS)[number];

export type BreakpointStops = BreakpointKeys | "fallback";

export type ExcludeUndefined<T> = Exclude<T, undefined>;

export type ExtractMessageShape<
  T,
  Required extends boolean = true,
> = T extends readonly (infer U)[]
  ? ExtractMessageShape<U, Required>[]
  : T extends object
    ? Required extends true
      ? {
          [K in keyof T as K extends "$typeName" | "$unknown"
            ? never
            : K]-?: ExtractMessageShape<T[K], Required>;
        }
      : {
          [K in keyof T as K extends "$typeName" | "$unknown"
            ? never
            : K]?: ExtractMessageShape<T[K], Required>;
        }
    : T;

export type UseDomainQuery<I, O> = (
  params: I,
  options?: Omit<UseQueryOptions<O>, "queryKey" | "queryFn">,
) => UseQueryResult<O>;

export type UseDomainSuspenseQuery<I, O> = (
  params: I,
  options?: Omit<UseSuspenseQueryOptions<O>, "queryKey" | "queryFn">,
) => UseSuspenseQueryResult<O>;

export type UseDomainMutation<I, O> = (
  options?: Omit<UseMutationOptions<O, Error, I>, "mutationFn">,
) => UseMutationResult<O, Error, I>;

export type PropValueWithBreakpoints<T> = T | { [P in BreakpointStops]?: T };

export type WithRenderProps<T, P extends object> = T | ((renderProps: P) => T);

export type SidebarItemType =
  (typeof SidebarItemTypes)[keyof typeof SidebarItemTypes];

export type SidebarGroupItem = {
  type: typeof SidebarItemTypes.GROUP;
  title: string;
  items: SidebarNodeItem[];
};

export type SidebarLeafNodeItem = {
  type: typeof SidebarItemTypes.LEAF_NODE;
  title: string;
  iconData: string;
  href: string;
};

export type SidebarParentNodeItem = {
  type: typeof SidebarItemTypes.PARENT_NODE;
  title: string;
  iconData: string;
  items: SidebarLeafNodeItem[];
};

type SidebarNodeItem = SidebarLeafNodeItem | SidebarParentNodeItem;
export type SidebarItem = SidebarNodeItem | SidebarGroupItem;

export type Language = (typeof Languages)[keyof typeof Languages];

export type AppConfig = {
  name: string;
  logo: string;
  language: Language;
};

export type RequestSuccess<TransformedData> = {
  success: true;
  data: TransformedData;
};

export type RequestFailure = {
  success: false;
  message: string;
  status?: number;
  statusText?: string;
};

export type RequestResult<TransformedData> =
  | RequestSuccess<TransformedData>
  | RequestFailure;

export type UnwrapRequestResult<
  Result extends RequestResult<any>,
  Target extends "success" | "failure",
> = Target extends "success"
  ? Result extends RequestSuccess<infer Data>
    ? RequestSuccess<Data>
    : never
  : Target extends "failure"
    ? RequestFailure
    : never;

export type StringifiedLocalDatetime = z.infer<
  typeof stringifiedLocalDatetimeSchema
>;

export type InferTanstackFormApi<
  TOptions extends Partial<
    FormOptions<any, any, any, any, any, any, any, any, any, any, any, any>
  >,
> =
  TOptions extends Partial<
    FormOptions<
      infer TFormData,
      infer TOnMount,
      infer TOnChange,
      infer TOnChangeAsync,
      infer TOnBlur,
      infer TOnBlurAsync,
      infer TOnSubmit,
      infer TOnSubmitAsync,
      infer TOnDynamic,
      infer TOnDynamicAsync,
      infer TOnServer,
      infer TSubmitMeta
    >
  >
    ? FormApi<
        TFormData,
        TOnMount,
        TOnChange,
        TOnChangeAsync,
        TOnBlur,
        TOnBlurAsync,
        TOnSubmit,
        TOnSubmitAsync,
        TOnDynamic,
        TOnDynamicAsync,
        TOnServer,
        TSubmitMeta
      >
    : never;

export type InferTanstackReactFormApi<
  TOptions extends Partial<
    FormOptions<any, any, any, any, any, any, any, any, any, any, any, any>
  >,
> =
  TOptions extends Partial<
    FormOptions<
      infer TFormData,
      infer TOnMount,
      infer TOnChange,
      infer TOnChangeAsync,
      infer TOnBlur,
      infer TOnBlurAsync,
      infer TOnSubmit,
      infer TOnSubmitAsync,
      infer TOnDynamic,
      infer TOnDynamicAsync,
      infer TOnServer,
      infer TSubmitMeta
    >
  >
    ? ReactFormExtendedApi<
        TFormData,
        TOnMount,
        TOnChange,
        TOnChangeAsync,
        TOnBlur,
        TOnBlurAsync,
        TOnSubmit,
        TOnSubmitAsync,
        TOnDynamic,
        TOnDynamicAsync,
        TOnServer,
        TSubmitMeta
      >
    : never;

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
};
