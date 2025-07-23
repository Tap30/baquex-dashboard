import { useLoaderData } from "react-router";
import { type PageLoaderData } from "./types.ts";

export const DashboardPage: React.FC = () => {
  const data = useLoaderData<PageLoaderData>();

  console.log({ data });

  return (
    <section>
      <h1>Dashboard Page</h1>
    </section>
  );
};
