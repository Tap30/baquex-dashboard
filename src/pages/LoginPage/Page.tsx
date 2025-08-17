import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { TapsiIcon } from "@/components/TapsiIcon";
import { Text } from "@/components/Text";
import { toast } from "@/components/Toaster";
import appConfig from "@/config";
import { auth } from "@/services/auth";
import { strings } from "@/static-content";
import classes from "./styles.module.css";

const { logo, name } = appConfig;

export const LoginPage: React.FC = () => {
  const buttonText = [
    strings.login.title,
    strings.with,
    strings.authProviders.tapsi,
  ].join(" ");

  const handleLoginClick = () => {
    void auth.signin().catch(e => {
      // eslint-disable-next-line no-console
      console.error(e);

      toast({
        title: strings.login.error.title,
        description: strings.login.error.description,
        color: "negative",
      });
    });
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className={classes["root"]}
    >
      <Flex
        gap="md"
        direction="column"
        alignItems="center"
        className={classes["card"]}
      >
        <img
          className={classes["logo"]}
          src={logo}
          alt="Logo"
        />
        <Text
          className={classes["title"]}
          as="h1"
          variant="h6"
          align="center"
        >
          {name}
        </Text>
        <Text
          className={classes["description"]}
          as="strong"
          variant="subheading2"
          color="tertiary"
          align="center"
        >
          {strings.login.description}
        </Text>
        <Button
          fluid
          key={buttonText}
          text={buttonText}
          startIcon={<TapsiIcon />}
          onClick={handleLoginClick}
        />
      </Flex>
    </Flex>
  );
};
