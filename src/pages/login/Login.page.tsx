import { Button } from "@components/Button";
import { Flex } from "@components/Flex";
import { TapsiIcon } from "@components/TapsiIcon";
import { Text } from "@components/Text";
import { toast } from "@components/Toaster";
import appConfig from "@config";
import { DASHBOARD_PATH, RETURN_URL_SEARCH_PARAM_KEY } from "@constants/routes";
import { useAuth } from "@services/auth";
import { strings } from "@static-content";
import { sanitizeRelativeInternalUrl } from "@utils/sanitize";
import { useLocation } from "react-router";
import classes from "./styles.module.css";

const { logo, name } = appConfig;

export const LoginPage: React.FC = () => {
  const buttonText = [
    strings.login.title,
    strings.with,
    strings.authProviders.tapsi,
  ].join(" ");

  const location = useLocation();
  const { signin } = useAuth();

  const handleLoginClick = () => {
    const searchParams = new URLSearchParams(location.search);
    const returnUrl = searchParams.get(RETURN_URL_SEARCH_PARAM_KEY);

    let safeReturnUrl = DASHBOARD_PATH;

    if (returnUrl) {
      try {
        safeReturnUrl = sanitizeRelativeInternalUrl(returnUrl);
      } catch {
        safeReturnUrl = DASHBOARD_PATH;
      }
    }

    void signin({ returnUrl: safeReturnUrl }).catch(e => {
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
