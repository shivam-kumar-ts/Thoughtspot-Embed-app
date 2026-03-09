import { HomePage, PrimaryNavbarVersion } from "@thoughtspot/visual-embed-sdk";

const USERNAME = process.env.NEXT_PUBLIC_TS_USERNAME || '';
const PASSWORD = process.env.NEXT_PUBLIC_TS_PASSWORD || '';
const HOST = process.env.NEXT_PUBLIC_TS_HOST || '';

const VALIDITY_TIME_IN_SEC = 3600;

const LIVEBOARD_ID = process.env.NEXT_PUBLIC_TS_LIVEBOARD_ID || '';
const VIZ_ID = process.env.NEXT_PUBLIC_TS_VIZ_ID || '';
const WORKSHEET_ID = process.env.NEXT_PUBLIC_TS_WORKSHEET_ID || '';

const embedConfig = {
    globalConfig: {
        frameParams: {
            height: "var(--ts-content-height)",
            width: "100vw",
        },
        customizations: {
            style: {
                customCSS: {
                    rules_UNSTABLE: {
                        ".embed-module__footerWrapper": {
                            display: "none !important",
                        },
                    },
                },
            },
        },
        fullHeight: true,
        onALL: (err: unknown) => {
            console.log(err);
        }
    },
    liveboardConfig: {
        liveboardId: LIVEBOARD_ID,
    },
    vizConfig: {
        liveboardId: LIVEBOARD_ID,
        vizId: VIZ_ID,
    },
    spotterConfig: {
        worksheetId: WORKSHEET_ID,
    },
    fullAppConfig: {
        showPrimaryNavbar: true,
        modularHomeExperience: true,
        discoveryExperience: {
            primaryNavbarVersion: PrimaryNavbarVersion.Sliding,
            homePage: HomePage.ModularWithStylingChanges,
        },
    },
    searchConfig: {
    },
};

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
    embedConfig,
    LINKS,
};