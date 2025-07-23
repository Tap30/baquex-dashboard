import { Text } from "@/components";
import { strings } from "@/static-content";

export const LoginPage: React.FC = () => {
  return (
    <section>
      <Text
        variant="h6"
        as="h1"
      >
        {strings.login.title}
      </Text>
    </section>
  );
};
