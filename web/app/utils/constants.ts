const USERNAME = process.env.NEXT_PUBLIC_TS_USERNAME || '';
const PASSWORD = process.env.NEXT_PUBLIC_TS_PASSWORD || '';
const HOST = process.env.NEXT_PUBLIC_TS_HOST || '';

const VALIDITY_TIME_IN_SEC = 3600;

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

export {
    USERNAME,
    PASSWORD,
    HOST,
    VALIDITY_TIME_IN_SEC,
    LIVEBOARD_ID,
    WORKSHEET_ID,
    VIZ_ID,
    LINKS,
};