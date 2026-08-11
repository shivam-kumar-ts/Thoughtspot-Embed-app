import { API, ERROR_MESSAGES } from './constants';
import { getEmbedEnv } from './embedEnv';
import { init, AuthType, LogLevel } from '@thoughtspot/visual-embed-sdk';

export type AuthErrorCallback = (error: Error) => void;

const fetchAuthToken = async (): Promise<string> => {
    const { username, host, password } = getEmbedEnv();
    const response = await fetch(`${host}${API.TS_AUTH_PATH}`, {
        method: 'POST',
        headers: {
            accept: API.CONTENT_TYPE,
            'content-type': API.CONTENT_TYPE,
        },
        body: JSON.stringify({
            username,
            validity_time_in_sec: API.VALIDITY_TIME_IN_SEC,
            auto_create: false,
            password,
        }),
    });

    if (!response.ok) {
        const body = await response.json().catch(() => null);
        const detail = body?.error || response.statusText;
        throw new Error(`${ERROR_MESSAGES.AUTH_TOKEN_FETCH}: ${detail}`);
    }

    const data = await response.json();
    if (!data?.token) {
        throw new Error(ERROR_MESSAGES.AUTH_TOKEN_MISSING);
    }

    return data.token;
};

const getAuthStrategy = () => {
    const { username } = getEmbedEnv();
    return {
        authType: AuthType.TrustedAuthTokenCookieless,
        getAuthToken: fetchAuthToken,
        username,
    };
};

export const authenticate = async (onError?: AuthErrorCallback): Promise<void> => {
    try {
        const { host } = getEmbedEnv();
        await init({
            thoughtSpotHost: host,
            ...getAuthStrategy(),
            autoLogin: true,
            disableTokenVerification: true,
            logLevel: LogLevel.DEBUG,
        });
    } catch (error) {
        const initError = error instanceof Error ? error : new Error(ERROR_MESSAGES.AUTH_INIT_FAILED);
        console.error('Authentication failed:', initError);
        onError?.(initError);
        throw initError;
    }
};
