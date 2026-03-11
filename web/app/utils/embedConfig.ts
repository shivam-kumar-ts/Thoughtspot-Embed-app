import { LIVEBOARD_ID, VIZ_ID, WORKSHEET_ID } from "@/app/utils/constants";
import { HomePage, ListPage, Page, PrimaryNavbarVersion } from "@thoughtspot/visual-embed-sdk";

const customCSSVariables = {
    variables: {
    }
};

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
                    ...customCSSVariables,
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
        isLiveboardCompactHeaderEnabled: true,
        isLiveboardMasterpiecesEnabled: true,
        isCentralizedLiveboardFilterUXEnabled: true,
        isEnhancedFilterInteractivityEnabled: true,
        isThisPeriodInDateFiltersEnabled: true,
        updatedSpotterChatPrompt: true,
        hideIrrelevantChipsInLiveboardTabs: true,
        coverAndFilterOptionInPDF: true,
    },

    vizConfig: {
        liveboardId: LIVEBOARD_ID,
        vizId: VIZ_ID,
        isThisPeriodInDateFiltersEnabled: true,
    },

    spotterConfig: {
        worksheetId: WORKSHEET_ID,
        updatedSpotterChatPrompt: true,
        spotterSidebarConfig: {
            enablePastConversationsSidebar: true,
        },
    },

    fullAppConfig: {
        showPrimaryNavbar: true,
        modularHomeExperience: true,
        discoveryExperience: {
            primaryNavbarVersion: PrimaryNavbarVersion.Sliding,
            homePage: HomePage.ModularWithStylingChanges,
            listPageVersion: ListPage.ListWithUXChanges,
        },
        isUnifiedSearchExperienceEnabled: true,
        isLiveboardCompactHeaderEnabled: true,
        isLiveboardMasterpiecesEnabled: true,
        isCentralizedLiveboardFilterUXEnabled: true,
        isEnhancedFilterInteractivityEnabled: true,
        isThisPeriodInDateFiltersEnabled: true,
        updatedSpotterChatPrompt: true,
        spotterSidebarConfig: {
            enablePastConversationsSidebar: true,
        },
        hideIrrelevantChipsInLiveboardTabs: true,
        coverAndFilterOptionInPDF: true,
        pageId: Page.Home,
    },

    searchConfig: {
        focusSearchBarOnRender: true,
        isThisPeriodInDateFiltersEnabled: true,
    },

    spotterAgentConfig: {
        worksheetId: WORKSHEET_ID,
    },
};

export default embedConfig;