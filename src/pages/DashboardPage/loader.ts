import type { LoaderFunction } from "react-router";
import type { PageLoaderData } from "./types.ts";

export const dashboardLoader: LoaderFunction =
  async (): Promise<PageLoaderData> => {
    return Promise.resolve(null);
  };
