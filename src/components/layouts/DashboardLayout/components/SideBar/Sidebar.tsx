import { Flex } from "@/components";
import { SIDEBAR_ITEMS } from "@/constants";
import { strings } from "@/static-content";
import { cn } from "@/utils";
import { Item } from "./components/index.ts";
import classes from "./styles.module.css";

type Props = {
  className?: string;
};

export const Sidebar: React.FC<Props> = props => {
  const { className } = props;

  const renderItems = () => {
    return SIDEBAR_ITEMS.map(item => (
      <Item
        key={item.title + item.type}
        item={item}
      />
    ));
  };

  return (
    <aside className={cn(classes["root"], className)}>
      <nav aria-label={strings.sidebar.title}>
        <Flex
          direction="column"
          gap="sm"
          alignItems="start"
        >
          {renderItems()}
        </Flex>
      </nav>
    </aside>
  );
};
