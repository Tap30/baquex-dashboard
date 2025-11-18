import { parseAsInteger, useQueryState } from "nuqs";

export const usePageIdx = () => {
  const [qs, setQs] = useQueryState(
    "pageIdx",
    parseAsInteger.withDefault(0).withOptions({
      history: "push",
    }),
  );

  return {
    pageIdx: qs,
    setPageIdx: setQs,
  };
};
