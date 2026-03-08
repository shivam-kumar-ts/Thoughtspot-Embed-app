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

const GITHUB_URL = "https://github.com/thoughtspot/visual-embed-sdk";
const REPO_OWNER_URL = "https://github.com/shivam-kumar-ts";
const DOCS_URL = "https://developers.thoughtspot.com/docs/";
const GET_STARTED_URL = "https://developers.thoughtspot.com/docs/getting-started";

export {
    USERNAME,
    PASSWORD,
    HOST,
    VALIDITY_TIME_IN_SEC,
    LIVEBOARD_ID,
    WORKSHEET_ID,
    VIZ_ID,
    embedConfig,
    GITHUB_URL,
    REPO_OWNER_URL,
    DOCS_URL,
    GET_STARTED_URL,
};