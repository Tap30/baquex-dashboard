import { Languages } from "@/constants";
import Localization from "react-localization";

type GlobalStrings = {
  login: {
    title: string;
  };
  components: {
    button: {
      pending: string;
    };
  };
};

export const strings = new Localization<GlobalStrings>({
  [Languages.EN]: {
    login: {
      title: "Login to Simorgh",
    },
    components: {
      button: {
        pending: "Pending",
      },
    },
  },
  [Languages.FA]: {
    login: {
      title: "ورود به سیمرغ",
    },
    components: {
      button: {
        pending: "در حال بررسی",
      },
    },
  },
});

strings.setLanguage(Languages.FA);
