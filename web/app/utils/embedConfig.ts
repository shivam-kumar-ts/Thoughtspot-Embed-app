import { HomePage, PrimaryNavbarVersion } from "@thoughtspot/visual-embed-sdk";
import { LIVEBOARD_ID, VIZ_ID, WORKSHEET_ID } from "@/app/utils/constants";

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

export default embedConfig;