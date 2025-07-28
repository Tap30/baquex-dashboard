import { DEFAULT_LANGUAGE, Languages } from "@/constants";
import Localization from "react-localization";

type GlobalStrings = {
  login: {
    title: string;
  };
  components: {
    button: {
      pending: string;
    };
    calendar: {
      nextMonth: string;
      previousMonth: string;
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
      calendar: {
        nextMonth: "Next Month",
        previousMonth: "Previous Month",
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
      calendar: {
        nextMonth: "ماه بعد",
        previousMonth: "ماه قبل",
      },
    },
  },
});

strings.setLanguage(DEFAULT_LANGUAGE);
