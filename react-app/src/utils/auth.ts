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
// Repro knobs:
//  - REPRO_VALIDITY_TIME_IN_SEC: short token life so expiry happens quickly.
//  - REPRO_CLOCK_SKEW_MS: simulates the user's browser clock being BEHIND
//    the ThoughtSpot server. isTokenExpired() then thinks the token is still
//    valid after TS has expired it, so getAuthToken hands the SDK the same
//    (already rejected) token again -> "Duplicate token" / auth failure.
//    Set to 0 to see the exact-expiry race instead.
// ---------------------------------------------------------------------------
const REPRO_VALIDITY_TIME_IN_SEC = 60;
const REPRO_CLOCK_SKEW_MS = -5 * 60 * 1000;

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
let tsAccesToken: string;
let tsTokenExpiry: number;
let showTS = false;
let showIframe = true;
let onAuthError: AuthErrorCallback | undefined;

const handleError = (error: unknown): void => {
    const err = error instanceof Error ? error : new Error(ERROR_MESSAGES.AUTH_UNEXPECTED);
    console.error('[ui] handleError:', err);
    onAuthError?.(err);
};

// Same as customer: errors are swallowed, so callers keep the old token.
const getToken = async (): Promise<void> => {
    try {
        const response = await getTSTokenFromBackend();

        if (!response || !response.token) {
            showIframe = false;
            throw new Error('Token is undefined');
        }
        showTS = true;
        tsAccesToken = response.token;
        tsTokenExpiry = response.expiration_time_in_millis;
        console.log('[ui] token received, expires at', new Date(tsTokenExpiry).toISOString());
    } catch (error) {
        showTS = false;
        showIframe = false;
        handleError(error);
    }
};

// Same as customer: server expiry vs browser clock, no margin.
// REPRO_CLOCK_SKEW_MS shifts the "browser clock" to simulate skew.
const isTokenExpired = (): boolean => {
    const now = Date.now() + REPRO_CLOCK_SKEW_MS;
    return tsTokenExpiry <= now;
};

export const authenticate = async (onError?: AuthErrorCallback): Promise<void> => {
    onAuthError = onError;
    try {
        await getToken();
        const { host } = getEmbedEnv();
        init({
            thoughtSpotHost: host,
            authType: AuthType.TrustedAuthTokenCookieless,
            autoLogin: true,
            disableLoginRedirect: true,
            // NOTE: no disableTokenVerification, same as the customer. That
            // flag changes how the SDK caches/validates the token and would
            // hide the bug.
            getAuthToken: async () => {
                console.log('[ui] SDK called getAuthToken');
                if (isTokenExpired()) {
                    console.log('token Refreshed');
                    await getToken();
                } else {
                    console.warn('[ui] returning the SAME token again (client thinks it is not expired)');
                }
                return tsAccesToken;
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
