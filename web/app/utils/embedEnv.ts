import { USERNAME, HOST } from '@/app/utils/constants';

export type EmbedEnv = {
    username: string;
    host: string;
    password: string;
};

const STORAGE_KEY = 'ts-embed-env';

const getDefaults = (): EmbedEnv => ({
    username: USERNAME,
    host: HOST,
    password: '',
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
        }),
    );
};

export const clearEmbedEnv = (): void => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.removeItem(STORAGE_KEY);
};
