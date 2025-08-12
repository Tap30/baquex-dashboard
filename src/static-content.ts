import { DEFAULT_LANGUAGE, Languages } from "@/constants";
import Localization from "react-localization";

type GlobalStrings = {
  logoutButton: string;
  from: string;
  comma: string;
  areYouSure: string;
  to: string;
  accessDenied: {
    title: string;
    description: string;
    backToDashboard: string;
  };
  notAuthenticated: {
    title: string;
    description: string;
    backToLogin: string;
  };
  notFound: {
    title: string;
    description: string;
    backToLogin: string;
    backToDashboard: string;
  };
  unknownUser: string;
  with: string;
  clearValue: string;
  close: string;
  cancel: string;
  empty: string;
  search: string;
  options: string;
  sorting: {
    ascending: string;
    descending: string;
    clear: string;
  };
  authProviders: {
    tapsi: string;
  };
  emptyStatement: {
    table: string;
  };
  login: {
    title: string;
    description: string;
    error: {
      title: string;
      description: string;
    };
  };
  components: {
    calendar: {
      day: string;
      month: string;
      year: string;
      nextMonth: string;
      previousMonth: string;
    };
    dateInput: {
      selectDate: string;
      selectDateRange: string;
    };
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
    from: "from",
    to: "to",
    comma: ",",
    areYouSure: "Are you sure?",
    unknownUser: "Unknown User",
    logoutButton: "Logout",
    close: "Close",
    with: "with",
    cancel: "Cancel",
    empty: "No results found",
    search: "Search",
    clearValue: "Clear value",
    breadcrumb: "Breadcrumb",
    options: "Options",
    authProviders: { tapsi: "Tapsi" },
    sorting: {
      ascending: "Sort ascending",
      descending: "Sort descending",
      clear: "Clear sort",
    },
    emptyStatement: {
      table: "No data found",
    },
    navButton: {
      close: "Close navigation menu",
      open: "Open navigation menu",
    },
    login: {
      title: "Login",
      description: "Select one of these authentication methods to use the app.",
      error: {
        title: "Login Error",
        description: "Please try again.",
      },
    },
    components: {
      button: {
        pending: "Pending",
      },
      calendar: {
        day: "day",
        month: "month",
        year: "year",
        nextMonth: "Next Month",
        previousMonth: "Previous Month",
      },
      dateInput: {
        selectDate: "Select date",
        selectDateRange: "Select a date range",
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
    accessDenied: {
      title: "Access Denied",
      description:
        "You don't have permission to view this page. If you believe this is an error, please contact your administrator.",
      backToDashboard: "Back to Dashboard",
    },
    notAuthenticated: {
      title: "Not Authenticated",
      description: "For using this panel, first you need to login.",
      backToLogin: "Go to Login Page",
    },
    notFound: {
      title: "Not Found",
      description:
        "The page you're looking for doesn't exist. It might have been moved or deleted. Please check the URL for errors or go back to the homepage.",
      backToLogin: "Back to Login",
      backToDashboard: "Back to Dashboard",
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
    from: "از",
    comma: "،",
    with: "با",
    to: "تا",
    unknownUser: "کاربر نامشخص",
    logoutButton: "خروج",
    areYouSure: "آیا از انجام این کار اطمینان دارید؟",
    clearValue: "حذف مقدار",
    close: "بستن",
    cancel: "لغو عملیات",
    empty: "موردی یافت نشد",
    search: "جستجو",
    breadcrumb: "نقشه صفحات",
    options: "گزینه‌ها",
    sorting: {
      ascending: "مرتب‌سازی صعودی",
      descending: "مرتب‌سازی نزولی",
      clear: "حذف مرتب‌سازی",
    },
    emptyStatement: {
      table: "هیچ داده‌ای یافت نشد.",
    },
    authProviders: { tapsi: "تپسی" },
    navButton: {
      close: "بستن نقشه اصلی",
      open: "باز کردن نقشه اصلی",
    },
    login: {
      title: "ورود",
      description:
        "برای ورود به برنامه، یکی از این متد‌های احراز هویت را انتخاب کنید.",
      error: {
        title: "خطا در ورود",
        description: "مجدداً تلاش کنید.",
      },
    },
    notFound: {
      title: "صفحه پیدا نشد",
      description:
        "صفحه‌ای که به دنبال آن بودید وجود ندارد و بنظر می‌آید بین صفحات گم شده‌اید. ممکن است منتقل یا حذف شده باشد. لطفاً آدرس (URL) را برای خطاهای احتمالی بررسی کنید یا به صفحه اصلی بازگردید.",
      backToLogin: "بازگشت به صفحه ورود",
      backToDashboard: "بازگشت به صفحه اصلی",
    },
    components: {
      button: {
        pending: "در حال بررسی",
      },
      calendar: {
        day: "روز",
        month: "ماه",
        year: "سال",
        nextMonth: "ماه بعد",
        previousMonth: "ماه قبل",
      },
      dateInput: {
        selectDate: "یک تاریخ انتخاب کنید",
        selectDateRange: "یک بازه تاریخ انتخاب کنید",
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
    accessDenied: {
      title: "خطا در دسترسی",
      description:
        "شما اجازه مشاهده این صفحه را ندارید. اگر فکر می‌کنید اشتباهی رخ داده، لطفاً با مدیر سیستم خود تماس بگیرید.",
      backToDashboard: "بازگشت به صفحه اصلی",
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
    notAuthenticated: {
      title: "خطای احراز هویت",
      description: "برای استفاده این این پنل ابتدا باید لاگین کنید.",
      backToLogin: "رفتن به لاگین",
    },
  },
});

strings.setLanguage(DEFAULT_LANGUAGE);
