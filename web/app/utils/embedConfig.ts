import { getEmbedEnv } from "@/app/utils/embedEnv";
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
        get additionalFlags() {
            return {
                overrideHistoryState: getEmbedEnv().overrideHistoryState,
            };
        },
        enableLinkOverridesV2: true,
        onALL: (err: unknown) => {
            console.log(err);
        }
    },

    liveboardConfig: {
        get liveboardId() { return getEmbedEnv().liveboardId; },
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
        get liveboardId() { return getEmbedEnv().liveboardId; },
        get vizId() { return getEmbedEnv().vizId; },
        isThisPeriodInDateFiltersEnabled: true,
    },

    spotterConfig: {
        get worksheetId() { return getEmbedEnv().worksheetId; },
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
        get worksheetId() { return getEmbedEnv().worksheetId; },
    },
};

export default embedConfig;