import { API, EMBED_AUTH_TYPES, ERROR_MESSAGES } from './constants';
import { getEmbedEnv } from './embedEnv';
import { init, AuthType, LogLevel } from '@thoughtspot/visual-embed-sdk';
import type { EmbedConfig } from '@thoughtspot/visual-embed-sdk';

export type AuthErrorCallback = (error: Error) => void;

type AuthStrategy = Pick<EmbedConfig, 'authType'> &
    Partial<Pick<EmbedConfig, 'getAuthToken' | 'username' | 'disableTokenVerification' | 'autoLogin'>>;

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

/**
 * Builds the auth slice of the init config for the auth type selected in the
 * connection settings. Embedded SSO needs no credentials from the host app:
 * ThoughtSpot redirects to the IdP inside the iframe and reuses the session
 * already established there.
 *
 * `autoLogin` is deliberately limited to the token flow. The SDK maps
 * `autoLogin: true` to `disableLoginRedirect=true` on the iframe URL, which
 * suppresses the very IdP redirect Embedded SSO depends on and leaves the
 * embed showing "not logged in".
 */
const getAuthStrategy = (): AuthStrategy => {
    const { username, authType } = getEmbedEnv();

    if (authType === EMBED_AUTH_TYPES.EMBEDDED_SSO) {
        return {
            authType: AuthType.EmbeddedSSO,
        };
    }

    return {
        authType: AuthType.TrustedAuthTokenCookieless,
        getAuthToken: fetchAuthToken,
        username,
        disableTokenVerification: true,
        autoLogin: true,
    };
};

export const authenticate = async (onError?: AuthErrorCallback): Promise<void> => {
    try {
        const { host } = getEmbedEnv();
        await init({
            thoughtSpotHost: host,
            ...getAuthStrategy(),
            logLevel: LogLevel.DEBUG,
        });
    } catch (error) {
        const initError = error instanceof Error ? error : new Error(ERROR_MESSAGES.AUTH_INIT_FAILED);
        console.error('Authentication failed:', initError);
        onError?.(initError);
        throw initError;
    }
};
