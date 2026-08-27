import { USERNAME, HOST, LIVEBOARD_ID, VIZ_ID, WORKSHEET_ID, AUTH_TYPE, EMBED_AUTH_TYPES } from './constants';

export type EmbedAuthType = (typeof EMBED_AUTH_TYPES)[keyof typeof EMBED_AUTH_TYPES];

export type EmbedEnv = {
    username: string;
    host: string;
    password: string;
    authType: EmbedAuthType;
    liveboardId: string;
    vizId: string;
    worksheetId: string;
    overrideHistoryState: boolean;
};

const STORAGE_KEY = 'ts-embed-env';

const isAuthType = (value: unknown): value is EmbedAuthType =>
    Object.values(EMBED_AUTH_TYPES).includes(value as EmbedAuthType);

const getDefaults = (): EmbedEnv => ({
    username: USERNAME,
    host: HOST,
    password: '',
    authType: isAuthType(AUTH_TYPE) ? AUTH_TYPE : EMBED_AUTH_TYPES.TRUSTED_TOKEN_COOKIELESS,
    liveboardId: LIVEBOARD_ID,
    vizId: VIZ_ID,
    worksheetId: WORKSHEET_ID,
    overrideHistoryState: true,
});

/**
 * Reads the active embed credentials. User-supplied values saved from the
 * home page form (persisted in localStorage) take precedence over the build
 * time environment defaults. Safe to call on the server (returns defaults).
 */
export const getEmbedEnv = (): EmbedEnv => {
    const defaults = getDefaults();
    if (typeof window === 'undefined') {
        return defaults;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return defaults;
        }

        const parsed = JSON.parse(raw) as Partial<EmbedEnv>;
        return {
            username: parsed.username?.trim() || defaults.username,
            host: parsed.host?.trim() || defaults.host,
            password: parsed.password ?? defaults.password,
            authType: isAuthType(parsed.authType) ? parsed.authType : defaults.authType,
            liveboardId: parsed.liveboardId?.trim() || defaults.liveboardId,
            vizId: parsed.vizId?.trim() || defaults.vizId,
            worksheetId: parsed.worksheetId?.trim() || defaults.worksheetId,
            overrideHistoryState:
                typeof parsed.overrideHistoryState === 'boolean'
                    ? parsed.overrideHistoryState
                    : defaults.overrideHistoryState,
        };
    } catch {
        return defaults;
    }
};

export const saveEmbedEnv = (env: EmbedEnv): void => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            username: env.username.trim(),
            host: env.host.trim(),
            password: env.password,
            authType: env.authType,
            liveboardId: env.liveboardId.trim(),
            vizId: env.vizId.trim(),
            worksheetId: env.worksheetId.trim(),
            overrideHistoryState: env.overrideHistoryState,
        }),
    );
};

export const clearEmbedEnv = (): void => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.removeItem(STORAGE_KEY);
};
