import { Spinner } from "@components/Spinner";
import { Text } from "@components/Text";
import { strings } from "@static-content";
import classes from "./styles.module.css";

export const SuspenseFallback: React.FC = () => {
  return (
    <div className={classes["root"]}>
      <Spinner size={20} />
      <Text variant="body2">{strings.pageLoading}</Text>
    </div>
  );
};
