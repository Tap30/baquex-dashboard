import { DEFAULT_LANGUAGE, Languages } from "@/constants";
import Localization from "react-localization";

type GlobalStrings = {
  logoutButton: string;
  login: {
    title: string;
  };
  components: {
    button: {
      pending: string;
    };
  };
  pages: {
    settings: {
      title: string;
    };
  };
  sidebar: {
    title: string;
    dashboard: string;
    analytics: string;
    team: {
      title: string;
      dev: string;
      qa: string;
    };
    groups: {
      documents: {
        title: string;
        dataLib: string;
        reports: string;
      };
    };
  };
  breadcrumb: string;
  navButton: {
    close: string;
    open: string;
  };
};

export const strings = new Localization<GlobalStrings>({
  [Languages.EN]: {
    logoutButton: "Logout",
    breadcrumb: "Breadcrumb",
    navButton: {
      close: "Close navigation menu",
      open: "Open navigation menu",
    },
    login: {
      title: "Login",
    },
    components: {
      button: {
        pending: "Pending",
      },
    },
    pages: {
      settings: {
        title: "Settings",
      },
    },
    sidebar: {
      title: "Main sidebar navigation",
      dashboard: "Dashboard",
      analytics: "Analytics",
      team: {
        title: "Team",
        dev: "Developers",
        qa: "Q/A",
      },
      groups: {
        documents: {
          title: "Documents",
          dataLib: "Data Library",
          reports: "Reports",
        },
      },
    },
  },
  [Languages.FA]: {
    logoutButton: "خروج",
    breadcrumb: "نقشه صفحات",
    navButton: {
      close: "بستن نقشه اصلی",
      open: "باز کردن نقشه اصلی",
    },
    login: {
      title: "ورود",
    },
    components: {
      button: {
        pending: "در حال بررسی",
      },
    },
    pages: {
      settings: {
        title: "تنظیمات",
      },
    },
    sidebar: {
      title: "نقشه اصلی",
      dashboard: "داشبورد",
      analytics: "آمار",
      team: {
        title: "تیم",
        dev: "توسعه‌دهندگان",
        qa: "تست‌کنندگان",
      },
      groups: {
        documents: {
          title: "اسناد",
          dataLib: "داده‌ها",
          reports: "گزارشات",
        },
      },
    },
  },
});

strings.setLanguage(DEFAULT_LANGUAGE);
