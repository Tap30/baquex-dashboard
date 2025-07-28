import { DEFAULT_LANGUAGE, Languages } from "@/constants";
import Localization from "react-localization";

type GlobalStrings = {
  logoutButton: string;
  clearValue: string;
  close: string;
  sorting: {
    ascending: string;
    descending: string;
    clear: string;
  };
  emptyStatement: {
    table: string;
  };
  login: {
    title: string;
  };
  components: {
    button: {
      pending: string;
    };
    paginator: {
      nextPage: string;
      prevPage: string;
      next5Pages: string;
      prev5Pages: string;
      goToPage: string;
    };
    fileInput: {
      multipleSelected: string;
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
    close: "Close",
    clearValue: "Clear value",
    breadcrumb: "Breadcrumb",
    sorting: {
      ascending: "Sort ascending",
      descending: "Sort descending",
      clear: "Clear sort",
    },
    emptyStatement: {
      table: "No data found.",
    },
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
      paginator: {
        nextPage: "Go to the next page",
        prevPage: "Go to the previous page",
        next5Pages: "Go to the next 5 pages",
        prev5Pages: "Go to the previous 5 pages",
        goToPage: "Go to the page {0}",
      },
      fileInput: {
        multipleSelected: "{0} files selected.",
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
    clearValue: "حذف مقدار",
    close: "بستن",
    breadcrumb: "نقشه صفحات",
    sorting: {
      ascending: "مرتب‌سازی صعودی",
      descending: "مرتب‌سازی نزولی",
      clear: "حذف مرتب‌سازی",
    },
    emptyStatement: {
      table: "هیچ داده‌ای یافت نشد.",
    },
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
      paginator: {
        nextPage: "صفحه بعدی",
        prevPage: "صفحه قبلی",
        next5Pages: "برو به پنج صفحه بعدی",
        prev5Pages: "برو به پنج صفحه قبلی",
        goToPage: "برو به صفحه {0}",
      },
      fileInput: {
        multipleSelected: "{0} فایل انتخاب شد.",
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
