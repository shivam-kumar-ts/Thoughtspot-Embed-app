import { USERNAME, API, ERROR_MESSAGES } from '@/app/utils/constants';
import { getThoughtSpotHost } from './utils';
import { init, AuthType, LogLevel } from '@thoughtspot/visual-embed-sdk';

export type AuthErrorCallback = (error: Error) => void;

const fetchAuthToken = async (onError?: AuthErrorCallback): Promise<string> => {
    try {
        const response = await fetch(API.AUTH_ENDPOINT, {
            method: 'POST',
            headers: {
                'content-type': API.CONTENT_TYPE,
            },
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
    } catch (error) {
        const authError = error instanceof Error ? error : new Error(ERROR_MESSAGES.AUTH_UNEXPECTED);
        onError?.(authError);
        throw authError;
    }
};

const getAuthStrategy = (onError?: AuthErrorCallback) => {
    return {
        authType: AuthType.TrustedAuthTokenCookieless,
        getAuthToken: () => fetchAuthToken(onError),
        username: USERNAME,
    };
};

export const authenticate = async (onError?: AuthErrorCallback): Promise<void> => {
    try {
        await init({
            thoughtSpotHost: getThoughtSpotHost(),
            ...getAuthStrategy(onError),
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
