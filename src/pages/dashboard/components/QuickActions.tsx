import { PanelCard } from "@components/PanelCard";
import { Text } from "@components/Text";
import { strings } from "@static-content";

const { title } = strings.pages.dashboard.sections.quickActions;

export const QuickActions: React.FC = () => {
  return (
    <PanelCard
      title={title}
      className="overflow-auto"
    >
      <Text
        variant="caption"
        align="center"
      >
        {strings.empty}
      </Text>
    </PanelCard>
  );
};
