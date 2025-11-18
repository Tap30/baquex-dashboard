import { parseAsJson, useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";
import type z from "zod";

export const useFilters = <
  ObjectSchema extends z.ZodObject,
  State extends object,
>(props: {
  queryParamsSchema: ObjectSchema;
  queryParamsToState: (queryParams: z.output<ObjectSchema>) => State;
  stateToQueryParams: (state: State) => z.output<ObjectSchema>;
}) => {
  const { queryParamsSchema, queryParamsToState, stateToQueryParams } = props;

  const [qs, setQs] = useQueryState(
    "filters",
    parseAsJson(queryParamsSchema.parse).withOptions({
      history: "push",
    }),
  );

  const appliedFilters: State | null = useMemo(
    () => (qs ? queryParamsToState(qs) : null),
    [qs, queryParamsToState],
  );

  const appliedFiltersCount: number = useMemo(() => {
    if (!qs) return 0;

    const values = Object.values(qs).filter(
      v =>
        v !== undefined &&
        v !== null &&
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        (Array.isArray(v) ? v.length > 0 : v.toString().length > 0),
    );

    return values.length;
  }, [qs]);

  const applyFilters = useCallback(
    (filters: State): void => {
      const parsedFiltersParams = stateToQueryParams(filters);

      const emptyFilters =
        Object.values(filters).filter(x => x !== undefined).length === 0;

      void setQs(emptyFilters ? null : parsedFiltersParams);
    },
    [setQs, stateToQueryParams],
  );

  const clearFilters = useCallback((): void => {
    void setQs(null);
  }, [setQs]);

  return {
    filtersQueryParams: qs,
    appliedFiltersCount,
    appliedFilters,
    clearFilters,
    applyFilters,
  };
};
