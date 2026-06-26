const USERNAME = process.env.NEXT_PUBLIC_TS_USERNAME || '';
const HOST = process.env.NEXT_PUBLIC_TS_HOST || '';

const LIVEBOARD_ID = process.env.NEXT_PUBLIC_TS_LIVEBOARD_ID || '';
const VIZ_ID = process.env.NEXT_PUBLIC_TS_VIZ_ID || '';
const WORKSHEET_ID = process.env.NEXT_PUBLIC_TS_WORKSHEET_ID || '';

const LINKS = {
    DOCS: {
        url: "https://developers.thoughtspot.com/docs/",
        label: "Docs",
    },
    GITHUB: {
        url: "https://github.com/thoughtspot/visual-embed-sdk",
        label: "GitHub",
    },
    REPO_OWNER: {
        url: "https://github.com/shivam-kumar-ts",
        label: "Made by shivam6862",
    },
    GET_STARTED: {
        url: "https://developers.thoughtspot.com/docs/getting-started",
        label: "Get Started",
    },
    READ_TUTORIAL: {
        url: "https://developers.thoughtspot.com/docs/tutorials/tse-fundamentals/intro",
        label: "Read the Guide",
    },
};

const NAV_ITEMS = [
    { href: "/liveboard", label: "Liveboard" },
    { href: "/viz", label: "Visualization" },
    { href: "/search", label: "Search" },
    { href: "/spotter", label: "Spotter" },
    { href: "/full_app", label: "Full App" },
    { href: "/spotter_agent", label: "Spotter Agent" },
];

const BRAND = {
    LOGO_MARK: "TS",
    NAME: "ThoughtSpot",
    TAG: "Embed Demo",
    FULL_NAME: "ThoughtSpot Embed App",
    TEMPLATE: "%s | ThoughtSpot Embed",
    SDK_NAME: "ThoughtSpot Embed SDK",
    VISUAL_SDK_NAME: "ThoughtSpot Visual Embed SDK",
};

const FEATURES = [
    {
        href: "/liveboard",
        icon: "📊",
        iconClass: "cardIconLiveboard",
        title: "Liveboard Embed",
        desc: "Embed interactive liveboards with real-time data visualizations directly into your application.",
    },
    {
        href: "/viz",
        icon: "📈",
        iconClass: "cardIconViz",
        title: "Visualization Embed",
        desc: "Embed individual chart visualizations for focused, contextual data insights.",
    },
    {
        href: "/search",
        icon: "🔍",
        iconClass: "cardIconSearch",
        title: "Search Embed",
        desc: "Give users the power to ask questions of their data using natural language search.",
    },
    {
        href: "/spotter",
        icon: "🤖",
        iconClass: "cardIconSpotter",
        title: "Spotter (AI)",
        desc: "AI-powered analytics assistant that helps users discover insights conversationally.",
    },
    {
        href: "/full_app",
        icon: "🚀",
        iconClass: "cardIconFullApp",
        title: "Full App Embed",
        desc: "Embed the complete ThoughtSpot experience with full navigation and discovery.",
    },
    {
        href: "/spotter_agent",
        icon: "🤖",
        iconClass: "cardIconSpotterAgent",
        title: "Spotter Agent",
        desc: "AI-powered analytics assistant that helps users discover insights conversationally.",
    },
];

const PAGE_TEXT = {
    HERO: {
        BADGE: "Live Demo Environment",
        TITLE: "Analytics That Live",
        TITLE_HIGHLIGHT: "Inside Your App",
        SUBTITLE:
            "Explore how ThoughtSpot Embed SDK lets you integrate powerful analytics, AI-driven search, and interactive dashboards seamlessly into any application.",
        CTA_PRIMARY: "Try Liveboard",
        CTA_EXPLORE: "Explore",
    },
    BANNER: {
        TITLE: "Ready to embed analytics?",
        SUBTITLE: "Get started with the ThoughtSpot Visual Embed SDK in minutes.",
    },
    ENV_FORM: {
        BADGE: "Connection Settings",
        TITLE: "Configure your ThoughtSpot environment",
        SUBTITLE:
            "Provide the credentials used to authenticate and embed. These are stored in your browser and used for all subsequent API calls.",
        FIELDS: {
            USERNAME: {
                label: "Username",
                placeholder: "e.g. shivam6862",
            },
            HOST: {
                label: "Host",
                placeholder: "e.g. https://my-instance.thoughtspot.cloud",
            },
            PASSWORD: {
                label: "Password",
                placeholder: "Your ThoughtSpot password",
            },
        },
        SAVE: "Save & Apply",
        RESET: "Reset to defaults",
        SUCCESS_TITLE: "Settings saved",
        SUCCESS_MESSAGE: "Your ThoughtSpot environment has been updated.",
        RESET_TITLE: "Settings reset",
        RESET_MESSAGE: "Reverted to the default environment configuration.",
    },
    NOT_FOUND: {
        CODE: "404",
        TITLE: "Page not found",
        DESCRIPTION:
            "The page you\u2019re looking for doesn\u2019t exist or has been moved. Try one of the links below to get back on track.",
        BACK_HOME: "Back to Home",
        TRY_LIVEBOARD: "Try Liveboard",
    },
    ERROR: {
        TITLE: "Something went wrong",
        DESCRIPTION:
            "An unexpected error occurred while loading this page. You can try again or head back to the home page.",
        RETRY: "Try Again",
        BACK_HOME: "Back to Home",
    },
    LOADING: "Loading analytics...",
    FOOTER: {
        BUILT_WITH: "Built with",
        USING_SDK: "using ThoughtSpot Embed SDK",
    },
};

const METADATA = {
    DESCRIPTION:
        "Demo application showcasing ThoughtSpot Embed SDK — interactive liveboards, AI-powered search, and full app analytics embedded into your application.",
    KEYWORDS: [
        "ThoughtSpot",
        "Embed SDK",
        "Analytics",
        "Liveboard",
        "Visualization",
        "Search",
        "Spotter",
    ],
    OG_DESCRIPTION:
        "Explore how ThoughtSpot Embed SDK lets you integrate powerful analytics into any application.",
};

const API = {
    AUTH_ENDPOINT: "/api/auth",
    TS_AUTH_PATH: "/api/rest/2.0/auth/token/full",
    VALIDITY_TIME_IN_SEC: 3600,
    CONTENT_TYPE: "application/json",
};

const ERROR_MESSAGES = {
    AUTH_TOKEN_FETCH: "Failed to fetch auth token",
    AUTH_TOKEN_MISSING: "No token received in response",
    AUTH_RESPONSE_PARSE_FAILED: "Unable to parse authentication response",
    AUTH_INIT_FAILED: "Failed to initialize authentication",
    AUTH_UNEXPECTED: "An unexpected authentication error occurred",
    INTERNAL_SERVER_ERROR: "Internal server error",
};

const NOTIFICATION_MESSAGES = {
    auth: {
        failed: "Authentication Failed",
        message: "Could not connect to ThoughtSpot. Please try again later.",
    }
};

const SPOTTER_AGENT_PAGE = {
    emptyState: {
        title: "Ask me anything about your data",
        subtitle: "I can help you explore insights, create visualizations, and answer questions using natural language.",
        suggestions: [
            "Show me sales by region",
            "What are the top 10 products?",
            "Revenue trend over last 12 months",
            "Compare sales this quarter vs last",
        ],
    },
    inputPlaceholder: "Ask about your data...",
    errorMessages: {
        processing: "Sorry, I encountered an error processing your request.",
        unexpected: "An unexpected error occurred. Please try again.",
    },
};

export {
    USERNAME,
    HOST,
    LIVEBOARD_ID,
    WORKSHEET_ID,
    VIZ_ID,
    LINKS,
    NAV_ITEMS,
    BRAND,
    FEATURES,
    PAGE_TEXT,
    METADATA,
    API,
    ERROR_MESSAGES,
    NOTIFICATION_MESSAGES,
    SPOTTER_AGENT_PAGE,
};
