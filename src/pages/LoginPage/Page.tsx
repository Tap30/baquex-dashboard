import logoSvg from "@/assets/logo.svg";
import { ClickableArea, Flex, TapsiIcon, Text, toast } from "@/components";
import { auth } from "@/services";
import { strings } from "@/static-content";
import { type ReactNode } from "react";
import classes from "./styles.module.css";

export const LoginPage: React.FC = () => {
  const authProviders = [
    {
      text: strings.authProviders.tapsi,
      icon: <TapsiIcon />,
    },
  ];

  const renderAuthProvider = (props: { text: string; icon: ReactNode }) => {
    const { text, icon } = props ?? {};
    const buttonText = [strings.login.title, strings.with, text].join(" ");
    const handleLoginClick = () => {
      void auth.signin().catch(e => {
        console.error(e);
        toast({
          title: strings.login.error.title,
          description: strings.login.error.description,
          color: "negative",
        });
      });
    };

    return (
      <ClickableArea
        key={text}
        onClick={handleLoginClick}
      >
        <Flex
          gap="sm"
          alignItems="center"
          justifyContent="center"
          className={classes["auth-provider"]}
        >
          <span className={classes["icon"]}>{icon}</span>
          <Text
            className={classes["text"]}
            variant="body1"
          >
            {buttonText}
          </Text>
        </Flex>
      </ClickableArea>
    );
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className={classes["root"]}
    >
      <Flex
        gap="md"
        alignItems="stretch"
        direction="column"
        className={classes["card"]}
      >
        <img
          className={classes["logo"]}
          src={logoSvg}
          alt="Logo"
        />
        <Text
          className={classes["title"]}
          as="h1"
          variant="h6"
        >
          {strings.login.title}
        </Text>
        <Text
          className={classes["description"]}
          as="strong"
          variant="subheading2"
          color="tertiary"
        >
          {strings.login.description}
        </Text>
        {authProviders.map(renderAuthProvider)}
      </Flex>
    </Flex>
  );
};
