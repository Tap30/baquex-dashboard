import appConfig from "@config";
import { Languages } from "@constants/languages";
import Localization from "react-localization";

type GlobalStrings = {
  list: string;
  irRial: string;
  table: string;
  pageLoading: string;
  logoutButton: string;
  remove: string;
  from: string;
  comma: string;
  areYouSure: string;
  today: string;
  yesterday: string;
  to: string;
  true: string;
  false: string;
  formErrors: string;
  appliedFilters: string;
  applyFilters: string;
  clearFilters: string;
  openFilters: string;
  closeFilters: string;
  percentage: string;
  breadcrumb: string;
  sidebar: string;
  unknownUser: string;
  unknown: string;
  with: string;
  error: string;
  clearValue: string;
  close: string;
  cancel: string;
  empty: string;
  search: string;
  options: string;
  refresh: string;
  validationMessages: {
    badInput: string;
    invalidSum: string;
    rangeOverflow: string;
    rangeUnderflow: string;
    tooLong: string;
    tooShort: string;
    valueMissing: string;
    nonNegative: string;
    kebabCase: string;
  };
  toastMessages: {
    itemCreatedSuccessfully: string;
    itemRemovedSuccessfully: string;
    itemUpdatedSuccessfully: string;
  };
  invalidUserError: {
    title: string;
    description: string;
    actionText: string;
  };
  accessDenied: {
    title: string;
    description: string;
    actionText: string;
  };
  notAuthorized: {
    title: string;
    description: string;
    actionText: string;
  };
  notAuthenticated: {
    title: string;
    description: string;
    actionText: string;
  };
  notFound: {
    title: string;
    description: string;
    backToLogin: string;
    backToDashboard: string;
  };
  genericError: {
    title: string;
    description: string;
    actionText: string;
  };
  dashboardDataError: {
    title: string;
    description: string;
  };
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
    noSelectedItem: string;
  };
  login: {
    title: string;
    description: string;
    error: {
      title: string;
      description: string;
    };
  };
  units: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    milliseconds: string;
  };
  components: {
    calendar: {
      day: string;
      month: string;
      year: string;
      nextMonth: string;
      previousMonth: string;
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
  navButton: {
    close: string;
    open: string;
  };
  pages: {
    dashboard: {
      title: string;
      sections: {
        quickActions: {
          title: string;
        };
      };
    };
  };
};

export const strings = new Localization<GlobalStrings>({
  [Languages.EN]: {
    irRial: "IRR",
    list: "List",
    table: "Table",
    pageLoading: "The page is loading",
    today: "Today",
    yesterday: "Yesterday",
    from: "from",
    remove: "Remove",
    to: "to",
    comma: ",",
    true: "True",
    false: "False",
    areYouSure: "Are you sure?",
    unknownUser: "Unknown User",
    unknown: "Unknown",
    logoutButton: "Logout",
    close: "Close",
    with: "with",
    error: "Error",
    cancel: "Cancel",
    empty: "No results found",
    search: "Search",
    clearValue: "Clear value",
    breadcrumb: "Breadcrumb",
    options: "Options",
    sidebar: "Main sidebar navigation",
    formErrors: "{0} Error(s) found",
    appliedFilters: "{0} Filter(s) applied",
    applyFilters: "Apply filters",
    clearFilters: "Clear filters",
    closeFilters: "Close filters",
    openFilters: "Open filters",
    refresh: "Refresh",
    percentage: "{0}%",
    units: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      milliseconds: "Milliseconds",
    },
    validationMessages: {
      badInput: "The value does not match the schema.",
      invalidSum: "The sum of values should be {0}.",
      rangeOverflow: "",
      rangeUnderflow: "",
      tooLong: "",
      tooShort: "",
      valueMissing: "The value is missing.",
      nonNegative: "The value must not be negative.",
      kebabCase:
        "Name must be in kebab-case format (lowercase letters, numbers, and hyphens only).",
    },
    toastMessages: {
      itemCreatedSuccessfully: "Item Created Successfully.",
      itemRemovedSuccessfully: "Item Removed Successfully.",
      itemUpdatedSuccessfully: "Item Updated Successfully.",
    },
    authProviders: {
      tapsi: "Tapsi",
    },
    sorting: {
      ascending: "Sort ascending",
      descending: "Sort descending",
      clear: "Clear sort",
    },
    emptyStatement: {
      table: "No data found",
      noSelectedItem: "No selected item.",
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
    invalidUserError: {
      title: "Invalid User",
      description:
        "Authentication completed but user information could not be retrieved. Please try logging in again.",
      actionText: "Try Again",
    },
    accessDenied: {
      title: "Access Denied",
      description:
        "You don't have permission to view this page. If you believe this is an error, please contact your administrator.",
      actionText: "Back to Dashboard",
    },
    notAuthenticated: {
      title: "Not Authenticated",
      description: "To use this panel, you must first log in to the system.",
      actionText: "Go to Login Page",
    },
    notAuthorized: {
      title: "Not Authorized",
      description:
        "Your request lacks valid authentication credentials for the requested resource.",
      actionText: "Go to Login Page",
    },
    notFound: {
      title: "Not Found",
      description:
        "The page you're looking for doesn't exist. It might have been moved or deleted. Please check the URL for errors or go back to the homepage.",
      backToLogin: "Back to Login",
      backToDashboard: "Back to Dashboard",
    },
    genericError: {
      title: "Oops! Something went wrong...",
      description:
        "The action you were performing or the page you were opening stopped working in a strange way.",
      actionText: "Refresh",
    },
    dashboardDataError: {
      title: "No dashboard data found",
      description:
        "Unable to load dashboard information. Please try refreshing the page.",
    },
    pages: {
      dashboard: {
        title: "Dashboard",
        sections: {
          quickActions: {
            title: "Quick Actions",
          },
        },
      },
    },
  },
  [Languages.FA]: {
    irRial: "ریال",
    list: "لیست",
    table: "جدول",
    pageLoading: "در حال آماده‌سازی صفحه",
    today: "امروز",
    yesterday: "دیروز",
    from: "از",
    comma: "،",
    with: "با",
    to: "تا",
    true: "True",
    false: "False",
    remove: "حذف",
    unknownUser: "کاربر نامشخص",
    unknown: "نامشخص",
    logoutButton: "خروج",
    areYouSure: "آیا از انجام این کار اطمینان دارید؟",
    clearValue: "حذف مقدار",
    error: "خطا",
    close: "بستن",
    cancel: "لغو عملیات",
    empty: "موردی یافت نشد",
    search: "جستجو",
    percentage: "٪{0}",
    breadcrumb: "نقشه صفحات",
    options: "گزینه‌ها",
    sidebar: "نقشه اصلی",
    formErrors: "{0} خطا در فرم",
    appliedFilters: "{0} فیلتر اعمال شده",
    applyFilters: "اعمال فیلتر‌ها",
    clearFilters: "حذف فیلتر‌ها",
    closeFilters: "بستن فیلترها",
    openFilters: "باز کردن فیلترها",
    refresh: "بازخوانی",
    units: {
      days: "روز",
      hours: "ساعت",
      minutes: "دقیقه",
      seconds: "ثانیه",
      milliseconds: "میلی‌ثانیه",
    },
    validationMessages: {
      invalidSum: "مجموع مقادیر باید برابر با {0} باشد.",
      badInput: "مقدار با الگو مطابقت ندارد.",
      rangeOverflow: "",
      rangeUnderflow: "",
      tooLong: "",
      tooShort: "",
      valueMissing: "این مقدار الزامیست.",
      nonNegative: "این فیلد نباید مقدار منفی داشته باشد",
      kebabCase:
        "نام باید در قالب kebab-case باشد (فقط حروف کوچک انگلیسی، اعداد و خط تیره).",
    },
    toastMessages: {
      itemCreatedSuccessfully: "آیتم مورد نظر با موفقیت ایجاد شد.",
      itemRemovedSuccessfully: "آیتم مورد نظر با موفقیت حذف شد.",
      itemUpdatedSuccessfully: "آیتم مورد نظر با موفقیت به‌روز شد.",
    },
    sorting: {
      ascending: "مرتب‌سازی صعودی",
      descending: "مرتب‌سازی نزولی",
      clear: "حذف مرتب‌سازی",
    },
    emptyStatement: {
      table: "هیچ داده‌ای یافت نشد.",
      noSelectedItem: "هیچ آپشنی انتخاب نشده است.",
    },
    authProviders: {
      tapsi: "تپسی",
    },
    navButton: {
      close: "بستن نقشه اصلی",
      open: "باز کردن نقشه اصلی",
    },
    login: {
      title: "ورود",
      description:
        "برای ورود به اپلیکیشن یکی از این متد‌های احراز هویت را انتخاب کنید.",
      error: {
        title: "خطا در ورود",
        description: "مجدداً تلاش کنید.",
      },
    },
    invalidUserError: {
      title: "کاربر نامعتبر",
      description:
        "احراز هویت تکمیل شد اما اطلاعات کاربری قابل بازیابی نیست. لطفاً مجدداً وارد شوید.",
      actionText: "تلاش مجدد",
    },
    notFound: {
      title: "صفحه پیدا نشد",
      description:
        "صفحه‌ای که به دنبال آن بودید وجود ندارد و بنظر می‌آید بین صفحات گم شده‌اید. ممکن است منتقل یا حذف شده باشد. لطفاً آدرس (URL) را برای خطاهای احتمالی بررسی کنید یا به صفحه اصلی بازگردید.",
      backToLogin: "بازگشت به صفحه ورود",
      backToDashboard: "بازگشت به صفحه اصلی",
    },
    genericError: {
      title: "خطایی نامشخص رخ داده است",
      description:
        "عملی که انجام می‌دادید یا صفحه‌ای که باز می‌کردید به طرز عجیبی از کار افتاد.",
      actionText: "بازخوانی صفحه",
    },
    dashboardDataError: {
      title: "اطلاعات داشبورد یافت نشد",
      description:
        "امکان بارگذاری اطلاعات داشبورد وجود ندارد. لطفاً صفحه را بازخوانی کنید.",
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
    accessDenied: {
      title: "خطا در دسترسی",
      description:
        "شما اجازه مشاهده این صفحه را ندارید. اگر فکر می‌کنید اشتباهی رخ داده، لطفاً با مدیر سیستم خود تماس بگیرید.",
      actionText: "بازگشت به صفحه اصلی",
    },
    notAuthenticated: {
      title: "خطای احراز هویت",
      description: "برای استفاده از این پنل ابتدا باید لاگین کنید.",
      actionText: "رفتن به لاگین",
    },
    notAuthorized: {
      title: "غیر مجاز",
      description:
        "درخواست شما فاقد اعتبار احراز هویت معتبر برای منبع درخواستی است.",
      actionText: "رفتن به لاگین",
    },
    pages: {
      dashboard: {
        title: "داشبورد",
        sections: {
          quickActions: {
            title: "میان‌برها",
          },
        },
      },
    },
  },
});

strings.setLanguage(appConfig.language);
