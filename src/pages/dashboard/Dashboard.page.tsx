import { Flex } from "@components/Flex";
import { DASHBOARD_PATH } from "@constants/routes";
import { strings } from "@static-content";
import { usePageBreadcrumb } from "@utils/use-page-breadcrumb";
import { QuickActions } from "./components/index.internal.ts";

const { title } = strings.pages.dashboard;

export const DashboardPage: React.FC = () => {
  usePageBreadcrumb([
    {
      title,
      href: DASHBOARD_PATH,
    },
  ]);

  return (
    <Flex
      as="section"
      direction="column"
      gap="md"
    >
      <QuickActions />
    </Flex>
  );
};
