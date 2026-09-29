import { API, ERROR_MESSAGES } from './constants';
import { getEmbedEnv } from './embedEnv';
import { init, AuthType, LogLevel } from '@thoughtspot/visual-embed-sdk';

export type AuthErrorCallback = (error: Error) => void;

// ---------------------------------------------------------------------------
// REPRO of the BD customer's embed (10.10.0.sw.cu2, SDK ^1.28.4).
//
// The "backend" (GetTSToken / GetAsync in their .NET app) and the Angular
// component (initializeThoughtSpot / getToken / isTokenExpired) are mirrored
// here as closely as possible, bugs included.
//
// FIXED: getAuthToken no longer returns a previously issued token. The SDK
// caches/validates the token and only calls getAuthToken when it needs a NEW
// one, so the client-side expiry check (isTokenExpired) was removed, and
// getToken now rethrows instead of swallowing errors.
//
// REPRO_VALIDITY_TIME_IN_SEC: short token life so expiry happens quickly.
// ---------------------------------------------------------------------------
const REPRO_VALIDITY_TIME_IN_SEC = 60;

type TSAccessToken = {
    token: string;
    expiration_time_in_millis: number;
};

// ---------------------------------------------------------------------------
// "Backend": mirrors GetTSToken + tokenProvider.GetAsync. The customer's
// server calls /auth/token/full and returns the TS response as-is
// ({ token, expiration_time_in_millis, ... }). Any failure is collapsed into
// a generic error, like their .NET code does.
// ---------------------------------------------------------------------------
const getTSTokenFromBackend = async (): Promise<TSAccessToken> => {
    const { username, host, password } = getEmbedEnv();
    console.log('[backend] Get Token from ThoughtSpot call started for', username);

    const response = await fetch(`${host}${API.TS_AUTH_PATH}`, {
        method: 'POST',
        headers: {
            accept: API.CONTENT_TYPE,
            'content-type': API.CONTENT_TYPE,
            'X-Requested-By': 'ThoughtSpot',
        },
        body: JSON.stringify({
            username,
            password,
            validity_time_in_sec: REPRO_VALIDITY_TIME_IN_SEC,
            auto_create: false,
        }),
    });

    if (!response.ok) {
        const body = await response.json().catch(() => null);
        console.error('[backend] Get Token from ThoughtSpot call failed.', response.status, body);
        throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }

    console.log('[backend] Get Token from ThoughtSpot call succeeded');
    return (await response.json()) as TSAccessToken;
};

// ---------------------------------------------------------------------------
// UI: mirrors the customer's Angular component.
// ---------------------------------------------------------------------------
// Token fetched before init(); handed to the SDK only once.
let tsAccesToken: string | null = null;
let showTS = false;
let showIframe = true;
let onAuthError: AuthErrorCallback | undefined;

const handleError = (error: unknown): void => {
    const err = error instanceof Error ? error : new Error(ERROR_MESSAGES.AUTH_UNEXPECTED);
    console.error('[ui] handleError:', err);
    onAuthError?.(err);
};

// Returns a NEW token on every call and rethrows on failure.
const getToken = async (): Promise<string> => {
    try {
        const response = await getTSTokenFromBackend();

        if (!response || !response.token) {
            showIframe = false;
            throw new Error('Token is undefined');
        }
        showTS = true;
        console.log('[ui] token received, expires at',
            new Date(response.expiration_time_in_millis).toISOString());
        return response.token;
    } catch (error) {
        showTS = false;
        showIframe = false;
        // Rethrow so the caller (authenticate / SDK) sees the failure
        // instead of silently getting a stale or undefined token
        throw error;
    }
};

export const authenticate = async (onError?: AuthErrorCallback): Promise<void> => {
    onAuthError = onError;
    try {
        tsAccesToken = await getToken();
        const { host } = getEmbedEnv();
        init({
            thoughtSpotHost: host,
            authType: AuthType.TrustedAuthTokenCookieless,
            autoLogin: true,
            disableLoginRedirect: true,
            // NOTE: no disableTokenVerification, same as the customer. That
            // flag changes how the SDK caches/validates the token and would
            // hide the bug.
            // SDK caches/validates the token and calls this only when it
            // needs a NEW one, so never return a previously issued token.
            getAuthToken: async () => {
                console.log('[ui] SDK called getAuthToken');
                if (tsAccesToken) {
                    // Hand the token fetched before init() to the SDK only once
                    const token = tsAccesToken;
                    tsAccesToken = null;
                    return token;
                }
                console.log('token Refreshed');
                return getToken();
            },
            logLevel: LogLevel.DEBUG,
        });
        if (!showTS) {
            console.warn('[ui] showTS is false, customer would not embed here');
        }
    } catch (error) {
        showIframe = false;
        handleError(error);
        throw error;
    }
    console.log('[ui] init done, showIframe =', showIframe);
};
