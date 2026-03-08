import type { SupportedLanguage } from "./languages";

type TranslationTree = {
  [key: string]: string | TranslationTree;
};

type ResourceByLanguage = Record<
  SupportedLanguage,
  { translation: TranslationTree }
>;

export const resources: ResourceByLanguage = {
  en: {
    translation: {
      common: {
        loading: "Loading",
        error: "Error",
        close: "Close",
        previousSlide: "Previous slide",
        nextSlide: "Next slide",
      },
      nav: {
        product: "Product",
        company: "Company",
        screener: "Screener",
        logIn: "Log in",
        logout: "Log out",
        online: "Online",
        openTracker: "Open tracker",
        tryScreener: "Try screener",
        toggleMenu: "Toggle menu",
        productLinks: {
          marketTracker: {
            title: "Market Tracker",
            description: "Candles, signals, and AI-assisted analysis.",
          },
          marketScreener: {
            title: "Market Screener",
            description: "Scan movers and filter for momentum.",
          },
          adviceEngine: {
            title: "Advice Engine",
            description: "Request trade guidance with rationale.",
          },
        },
        companyLinks: {
          features: "Features",
          insights: "Insights",
          about: "About",
        },
      },
      footer: {
        description:
          "Built for fast signal checks, clean charts, and practical market workflows.",
        product: "Product",
        company: "Company",
        marketTracker: "Market tracker",
        marketScreener: "Market screener",
        home: "Home",
        insights: "Insights",
      },
      hero: {
        title: "Signal-first market intelligence for crypto and stocks",
        subtitle:
          "Track candles, scan movers, and request AI-backed insights with clear rationale. Built for fast checks and calm decision-making.",
        startTracking: "Start tracking",
        runScreener: "Run screener",
        cards: {
          timeframes: "Timeframes",
          timeframesValue: "1H and 1D",
          timeframesDesc: "Toggle between intraday and daily views quickly.",
          signals: "Signals",
          signalsValue: "Actionable",
          signalsDesc: "BUY, SELL, HOLD, WATCH with confidence and rationale.",
          sources: "Sources",
          sourcesValue: "Multi-provider",
          sourcesDesc: "Binance, CoinGecko, and Stooq coverage.",
        },
      },
      features: {
        overline: "Features",
        title: "A clearer path from scan to signal",
        subtitle:
          "Focused dashboards and AI insights to help you move fast without the noise.",
        items: {
          momentum: {
            title: "Momentum snapshots",
            description:
              "Spot fast moves, volume shifts, and trend changes in seconds.",
          },
          ai: {
            title: "AI-guided analysis",
            description:
              "Ask for trade context and receive clear, explainable guidance.",
          },
          flow: {
            title: "Cross-market flow",
            description:
              "Track crypto and stocks together with a unified watchlist.",
          },
        },
      },
      coverage: {
        title: "Market Coverage",
        subtitle: "Track the most watched crypto assets live.",
      },
      pricing: {
        overline: "Pricing",
        title: "Clear plans for serious market work",
        subtitle:
          "Choose a plan that fits your workflow, from quick checks to full-stack research.",
        mostPopular: "Most popular",
        perMonth: "/mo",
        plans: {
          starter: {
            title: "Starter",
            button: "Start free",
            features: {
              watchlist: "Watchlist + alerts",
              basicScreeners: "Basic screeners",
              emailSupport: "Email support",
              dailyBrief: "Daily market brief",
            },
          },
          pro: {
            title: "Pro",
            button: "Upgrade now",
            features: {
              unlimitedWatchlists: "Unlimited watchlists",
              aiSummaries: "AI signal summaries",
              prioritySupport: "Priority support",
              backtestSnapshots: "Backtest snapshots",
              multiMarket: "Multi-market coverage",
            },
          },
          enterprise: {
            title: "Enterprise",
            button: "Contact sales",
            features: {
              customIntegrations: "Custom integrations",
              dedicatedSuccess: "Dedicated success",
              slaReports: "SLA + uptime reports",
              teamPermissions: "Team permissions",
              securityReview: "Security review",
            },
          },
        },
      },
      faq: {
        overline: "FAQ",
        title: "Answers for fast decisions",
        subtitle: "Everything you need to know before you switch to BaldWin.",
        items: {
          markets: {
            question: "What markets do you cover?",
            answer:
              "Crypto and equities out of the box, with more venues on the roadmap.",
          },
          trial: {
            question: "Is there a free trial?",
            answer:
              "Yes. Start with the Starter plan and upgrade any time from your dashboard.",
          },
          signals: {
            question: "How are signals generated?",
            answer:
              "We combine price action, volume, and momentum with AI summarization.",
          },
          cancel: {
            question: "Can I cancel whenever I want?",
            answer: "Absolutely. Plans are month to month with no lock-in.",
          },
          support: {
            question: "Do you provide support?",
            answer:
              "Yes. Email support for all plans, priority support for Pro and above.",
          },
        },
      },
      login: {
        backToHome: "Back to home",
        imageAlt: "Market intelligence visualization",
        form: {
          title: "Log in to your account",
          subtitle: "Enter your email below to log in to your account.",
          email: "Email",
          password: "Password",
          forgotPassword: "Forgot your password?",
          logIn: "Log in",
          logInGoogle: "Log in with Google",
          orContinue: "Or continue with",
          logInGithub: "Log in with GitHub",
          noAccount: "Don't have an account?",
          signUp: "Sign up",
        },
        dialog: {
          title: "Log in",
          continue: "Continue",
        },
      },
      marketTracker: {
        title: "Market Tracker",
        getSignal: "Get signal",
        dataSource: "Data source",
        loadingCandles: "Loading candles...",
      },
      marketScreener: {
        title: "Screener (run on submit)",
        scanning: "Scanning...",
        runScan: "Run scan",
        asOf: "asOf",
        unknown: "unknown",
      },
      marketControls: {
        type: "type",
        timeframe: "TF",
        crypto: "Crypto",
        stock: "Stock",
      },
      symbolPicker: {
        cryptoPlaceholder: "btc / eth / sol",
        stockPlaceholder: "aapl.us / tsla.us",
        typeAtLeast: "Type at least 2 characters",
        searching: "Searching...",
        noMatches: "No matches",
        useValue: "Use",
      },
      screenerControls: {
        timeframe: "Timeframe",
        news: "News",
        on: "ON",
        off: "OFF",
      },
      screenerTable: {
        symbol: "Symbol",
        price: "Price",
        volume: "Vol %",
        news: "News",
        score: "Score",
        why: "Why",
      },
      advice: {
        modelSignal: "Model signal",
        educationalSignal: "Educational signal (not financial advice)",
        source: "Source",
        analyzing: "Analyzing market data...",
        confidence: "Confidence",
        levels: "Levels",
        entry: "Entry",
        take: "Take",
        stop: "Stop",
        risk: "Risk",
        riskMgmt: "Risk mgmt",
        bullish: "Bullish",
        bearish: "Bearish",
        risks: "Risks",
        nextChecks: "Next checks",
        hideDetails: "Hide details",
        showMore: "Show more",
        buildingAdvice: "Building trade advice...",
        fixAndRetry: "Fix the error above and try again.",
        useRiskManagement: "Use risk management.",
        horizon: {
          intraday: "Intraday",
          swing: "Swing",
          longTerm: "Long-term",
        },
      },
      command: {
        palette: "Command Palette",
        searchCommand: "Search for a command to run...",
      },
      spinner: {
        loading: "Loading",
      },
    },
  },
  ru: {
    translation: {
      common: {
        loading: "Загрузка",
        error: "Ошибка",
        close: "Закрыть",
        previousSlide: "Предыдущий слайд",
        nextSlide: "Следующий слайд",
      },
      nav: {
        product: "Продукт",
        company: "Компания",
        screener: "Скринер",
        logIn: "Войти",
        openTracker: "Открыть трекер",
        tryScreener: "Попробовать скринер",
        toggleMenu: "Открыть меню",
        productLinks: {
          marketTracker: {
            title: "Market Tracker",
            description: "Свечи, сигналы и AI-анализ.",
          },
          marketScreener: {
            title: "Market Screener",
            description: "Сканируйте лидеров движения и фильтруйте импульс.",
          },
          adviceEngine: {
            title: "Advice Engine",
            description: "Получайте торговые рекомендации с обоснованием.",
          },
        },
        companyLinks: {
          features: "Возможности",
          insights: "Инсайты",
          about: "О нас",
        },
      },
      footer: {
        description:
          "Создано для быстрых проверок сигналов, чистых графиков и практичной рыночной работы.",
        product: "Продукт",
        company: "Компания",
        marketTracker: "Market tracker",
        marketScreener: "Market screener",
        home: "Главная",
        insights: "Инсайты",
      },
      hero: {
        title: "Рыночная аналитика для крипты и акций с фокусом на сигналы",
        subtitle:
          "Отслеживайте свечи, сканируйте активы и получайте AI-инсайты с понятной логикой. Сделано для быстрых проверок и спокойных решений.",
        startTracking: "Начать отслеживание",
        runScreener: "Запустить скринер",
        cards: {
          timeframes: "Таймфреймы",
          timeframesValue: "1H и 1D",
          timeframesDesc:
            "Быстро переключайтесь между внутридневным и дневным режимом.",
          signals: "Сигналы",
          signalsValue: "Практичные",
          signalsDesc: "BUY, SELL, HOLD, WATCH с уверенностью и обоснованием.",
          sources: "Источники",
          sourcesValue: "Несколько провайдеров",
          sourcesDesc: "Покрытие Binance, CoinGecko и Stooq.",
        },
      },
      features: {
        overline: "Возможности",
        title: "Более ясный путь от скана к сигналу",
        subtitle:
          "Сфокусированные панели и AI-инсайты помогают действовать быстро без лишнего шума.",
        items: {
          momentum: {
            title: "Снимки импульса",
            description:
              "Замечайте резкие движения, всплески объема и смену тренда за секунды.",
          },
          ai: {
            title: "AI-анализ",
            description:
              "Запрашивайте контекст сделки и получайте понятные рекомендации.",
          },
          flow: {
            title: "Кросс-рыночный поток",
            description:
              "Следите за криптой и акциями в едином списке наблюдения.",
          },
        },
      },
      coverage: {
        title: "Покрытие рынка",
        subtitle:
          "Отслеживайте самые популярные криптоактивы в реальном времени.",
      },
      pricing: {
        overline: "Тарифы",
        title: "Понятные планы для серьезной рыночной работы",
        subtitle:
          "Выберите план под свой процесс: от быстрых проверок до комплексного исследования.",
        mostPopular: "Самый популярный",
        perMonth: "/мес",
        plans: {
          starter: {
            title: "Starter",
            button: "Начать бесплатно",
            features: {
              watchlist: "Список наблюдения + алерты",
              basicScreeners: "Базовые скринеры",
              emailSupport: "Поддержка по email",
              dailyBrief: "Ежедневный рыночный бриф",
            },
          },
          pro: {
            title: "Pro",
            button: "Улучшить план",
            features: {
              unlimitedWatchlists: "Неограниченные watchlist",
              aiSummaries: "AI-сводки сигналов",
              prioritySupport: "Приоритетная поддержка",
              backtestSnapshots: "Снимки бэктестов",
              multiMarket: "Покрытие нескольких рынков",
            },
          },
          enterprise: {
            title: "Enterprise",
            button: "Связаться с продажами",
            features: {
              customIntegrations: "Кастомные интеграции",
              dedicatedSuccess: "Персональный менеджер",
              slaReports: "SLA и отчеты по аптайму",
              teamPermissions: "Права доступа команды",
              securityReview: "Проверка безопасности",
            },
          },
        },
      },
      faq: {
        overline: "FAQ",
        title: "Ответы для быстрых решений",
        subtitle: "Все, что нужно знать до перехода на BaldWin.",
        items: {
          markets: {
            question: "Какие рынки вы покрываете?",
            answer:
              "Крипта и акции доступны сразу, дополнительные площадки в дорожной карте.",
          },
          trial: {
            question: "Есть ли бесплатный период?",
            answer:
              "Да. Начните со Starter и перейдите на другой план в любой момент.",
          },
          signals: {
            question: "Как формируются сигналы?",
            answer:
              "Мы объединяем ценовое движение, объем и импульс с AI-суммаризацией.",
          },
          cancel: {
            question: "Можно отменить подписку в любое время?",
            answer: "Да. Планы помесячные, без долгосрочных обязательств.",
          },
          support: {
            question: "Есть ли поддержка?",
            answer:
              "Да. Email-поддержка для всех, приоритетная поддержка для Pro и выше.",
          },
        },
      },
      login: {
        backToHome: "Назад на главную",
        imageAlt: "Визуализация рыночной аналитики",
        form: {
          title: "Войдите в аккаунт",
          subtitle: "Введите email ниже, чтобы войти в аккаунт.",
          email: "Email",
          password: "Пароль",
          forgotPassword: "Забыли пароль?",
          logIn: "Войти",
          orContinue: "Или продолжить через",
          logInGithub: "Войти через GitHub",
          noAccount: "Нет аккаунта?",
          signUp: "Регистрация",
        },
        dialog: {
          title: "Вход",
          continue: "Продолжить",
        },
      },
      marketTracker: {
        title: "Market Tracker",
        getSignal: "Получить сигнал",
        dataSource: "Источник данных",
        loadingCandles: "Загрузка свечей...",
      },
      marketScreener: {
        title: "Скринер (запуск по кнопке)",
        scanning: "Сканирование...",
        runScan: "Запустить скан",
        asOf: "на",
        unknown: "неизвестно",
      },
      marketControls: {
        type: "тип",
        timeframe: "ТФ",
        crypto: "Крипто",
        stock: "Акции",
      },
      symbolPicker: {
        cryptoPlaceholder: "btc / eth / sol",
        stockPlaceholder: "aapl.us / tsla.us",
        typeAtLeast: "Введите минимум 2 символа",
        searching: "Поиск...",
        noMatches: "Совпадений нет",
        useValue: "Использовать",
      },
      screenerControls: {
        timeframe: "Таймфрейм",
        news: "Новости",
        on: "ВКЛ",
        off: "ВЫКЛ",
      },
      screenerTable: {
        symbol: "Символ",
        price: "Цена",
        volume: "Волат. %",
        news: "Новости",
        score: "Оценка",
        why: "Причины",
      },
      advice: {
        modelSignal: "Сигнал модели",
        educationalSignal: "Учебный сигнал (не финансовый совет)",
        source: "Источник",
        analyzing: "Анализ рыночных данных...",
        confidence: "Уверенность",
        levels: "Уровни",
        entry: "Вход",
        take: "Тейк",
        stop: "Стоп",
        risk: "Риск",
        riskMgmt: "Риск-менеджмент",
        bullish: "Бычьи факторы",
        bearish: "Медвежьи факторы",
        risks: "Риски",
        nextChecks: "Следующие проверки",
        hideDetails: "Скрыть детали",
        showMore: "Показать больше",
        buildingAdvice: "Формирование торговой рекомендации...",
        fixAndRetry: "Исправьте ошибку выше и попробуйте снова.",
        useRiskManagement: "Используйте риск-менеджмент.",
        horizon: {
          intraday: "Внутри дня",
          swing: "Свинг",
          longTerm: "Долгосрок",
        },
      },
      command: {
        palette: "Палитра команд",
        searchCommand: "Поиск команды...",
      },
      spinner: {
        loading: "Загрузка",
      },
    },
  },
  et: {
    translation: {
      common: {
        loading: "Laadimine",
        error: "Viga",
        close: "Sulge",
        previousSlide: "Eelmine slaid",
        nextSlide: "Jargmine slaid",
      },
      nav: {
        product: "Toode",
        company: "Ettevote",
        screener: "Screener",
        logIn: "Logi sisse",
        openTracker: "Ava tracker",
        tryScreener: "Proovi screenerit",
        toggleMenu: "Ava menuu",
        productLinks: {
          marketTracker: {
            title: "Market Tracker",
            description: "Kuunlad, signaalid ja AI-analuus.",
          },
          marketScreener: {
            title: "Market Screener",
            description: "Skaneeri liikumisi ja filtreeri momentumit.",
          },
          adviceEngine: {
            title: "Advice Engine",
            description: "Kusi tehingusoovitusi koos pohjendusega.",
          },
        },
        companyLinks: {
          features: "Voimalused",
          insights: "Ulevaated",
          about: "Meist",
        },
      },
      footer: {
        description:
          "Loodud kiireks signaalikontrolliks, puhasteks graafikuteks ja praktiliseks turutoooks.",
        product: "Toode",
        company: "Ettevote",
        marketTracker: "Market tracker",
        marketScreener: "Market screener",
        home: "Avaleht",
        insights: "Ulevaated",
      },
      hero: {
        title: "Signaalikeskne turuintelligents krupole ja aktsiatele",
        subtitle:
          "Jalgi kuunlaid, skaneeri liikujaid ja kusi AI-toega ulevaateid koos selge pohjendusega.",
        startTracking: "Alusta jalgimist",
        runScreener: "Kaivita screener",
        cards: {
          timeframes: "Ajavahemikud",
          timeframesValue: "1H ja 1D",
          timeframesDesc: "Lulitu kiiresti paevasisese ja paevavaate vahel.",
          signals: "Signaalid",
          signalsValue: "Rakendatavad",
          signalsDesc: "BUY, SELL, HOLD, WATCH koos kindluse ja pohjendusega.",
          sources: "Allikad",
          sourcesValue: "Mitme pakkujaga",
          sourcesDesc: "Binance, CoinGecko ja Stooq katvus.",
        },
      },
      features: {
        overline: "Voimalused",
        title: "Selgem tee skaneeringust signaalini",
        subtitle:
          "Fookustatud dashboardid ja AI-ulevaated aitavad kiiresti tegutseda ilma murata.",
        items: {
          momentum: {
            title: "Momendi hetkepildid",
            description:
              "Marka kiireid liikumisi, mahumuutusi ja trendipooore sekunditega.",
          },
          ai: {
            title: "AI-juhitud analiis",
            description:
              "Kusi tehingukonteksti ja saa selgeid, selgitatavaid soovitusi.",
          },
          flow: {
            title: "Turgudevaheline voog",
            description: "Jalgi krupot ja aktsiaid uhtses watchlistis.",
          },
        },
      },
      coverage: {
        title: "Turukatvus",
        subtitle: "Jalgi enim vaadatud krupovarasi reaalajas.",
      },
      pricing: {
        overline: "Hinnad",
        title: "Selged plaanid tosiseks turutooks",
        subtitle:
          "Vali tootovoole sobiv plaan, alates kiirest kontrollist kuni taismahulise uurimistooni.",
        mostPopular: "Koige populaarsem",
        perMonth: "/kuu",
        plans: {
          starter: {
            title: "Starter",
            button: "Alusta tasuta",
            features: {
              watchlist: "Watchlist + teavitused",
              basicScreeners: "Pohiscreenerid",
              emailSupport: "Email tugi",
              dailyBrief: "Igapaevane turuulevaade",
            },
          },
          pro: {
            title: "Pro",
            button: "Uuenda kohe",
            features: {
              unlimitedWatchlists: "Piiramatu watchlist",
              aiSummaries: "AI signaali kokkuvotted",
              prioritySupport: "Prioriteetne tugi",
              backtestSnapshots: "Backtesti hetkepildid",
              multiMarket: "Mitme turu katvus",
            },
          },
          enterprise: {
            title: "Enterprise",
            button: "Vota uhendust muugiga",
            features: {
              customIntegrations: "Kohandatud integratsioonid",
              dedicatedSuccess: "Puhendunud klienditugi",
              slaReports: "SLA + uptime raportid",
              teamPermissions: "Tiimi oigused",
              securityReview: "Turvakontroll",
            },
          },
        },
      },
      faq: {
        overline: "KKK",
        title: "Vastused kiireteks otsusteks",
        subtitle: "Koik, mida vajad enne BaldWinile ule minekut.",
        items: {
          markets: {
            question: "Milliseid turge te katate?",
            answer:
              "Krupo ja aktsiad on olemas kohe, rohkem turge on roadmapis.",
          },
          trial: {
            question: "Kas tasuta prooviperiood on olemas?",
            answer: "Jah. Alusta Starteriga ja uuenda igal ajal dashboardist.",
          },
          signals: {
            question: "Kuidas signaale luuakse?",
            answer:
              "Uhildame hinnaliikumise, mahu ja momentumi AI kokkuvotetega.",
          },
          cancel: {
            question: "Kas saan igal ajal katkestada?",
            answer: "Jah. Plaanid on kuupohised ja ilma siduva lepinguta.",
          },
          support: {
            question: "Kas pakute tuge?",
            answer:
              "Jah. Email tugi koikidele plaanidele, prioriteetne tugi Pro-le ja edasi.",
          },
        },
      },
      login: {
        backToHome: "Tagasi avalehele",
        imageAlt: "Turuandmete visualisatsioon",
        form: {
          title: "Logi oma kontole sisse",
          subtitle: "Sisesta allpool oma email, et kontole sisse logida.",
          email: "Email",
          password: "Parool",
          forgotPassword: "Unustasid parooli?",
          logIn: "Logi sisse",
          orContinue: "Voi jatka teenusega",
          logInGithub: "Logi sisse GitHubiga",
          noAccount: "Pole kontot?",
          signUp: "Registreeru",
        },
        dialog: {
          title: "Sisselogimine",
          continue: "Jatka",
        },
      },
      marketTracker: {
        title: "Market Tracker",
        getSignal: "Hangi signaal",
        dataSource: "Andmeallikas",
        loadingCandles: "Kuunalde laadimine...",
      },
      marketScreener: {
        title: "Screener (kaivita nupuga)",
        scanning: "Skaneerimine...",
        runScan: "Kaivita skaneering",
        asOf: "seisuga",
        unknown: "teadmata",
      },
      marketControls: {
        type: "tuup",
        timeframe: "TF",
        crypto: "Krypto",
        stock: "Aktsia",
      },
      symbolPicker: {
        cryptoPlaceholder: "btc / eth / sol",
        stockPlaceholder: "aapl.us / tsla.us",
        typeAtLeast: "Sisesta vahemalt 2 tahemarki",
        searching: "Otsimine...",
        noMatches: "Vasteid pole",
        useValue: "Kasuta",
      },
      screenerControls: {
        timeframe: "Ajavahemik",
        news: "Uudised",
        on: "SEES",
        off: "VALJAS",
      },
      screenerTable: {
        symbol: "Sumbol",
        price: "Hind",
        volume: "Vol %",
        news: "Uudised",
        score: "Skoor",
        why: "Miks",
      },
      advice: {
        modelSignal: "Mudeli signaal",
        educationalSignal: "Hariduslik signaal (mitte finantsnouanne)",
        source: "Allikas",
        analyzing: "Turuanalusi tootlemine...",
        confidence: "Kindlus",
        levels: "Tasemed",
        entry: "Sisenemine",
        take: "Kasum",
        stop: "Stop",
        risk: "Risk",
        riskMgmt: "Riskijuhtimine",
        bullish: "Tousvad faktorid",
        bearish: "Langevad faktorid",
        risks: "Riskid",
        nextChecks: "Jargmised kontrollid",
        hideDetails: "Peida detailid",
        showMore: "Nae rohkem",
        buildingAdvice: "Koostan tehingusoovitust...",
        fixAndRetry: "Paranda uleval toodud viga ja proovi uuesti.",
        useRiskManagement: "Kasuta riskijuhtimist.",
        horizon: {
          intraday: "Paevasisene",
          swing: "Swing",
          longTerm: "Pikaajaline",
        },
      },
      command: {
        palette: "Kaesupalett",
        searchCommand: "Otsi kaesku...",
      },
      spinner: {
        loading: "Laadimine",
      },
    },
  },
};
