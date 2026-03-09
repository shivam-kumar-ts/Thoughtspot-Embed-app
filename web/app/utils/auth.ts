import { USERNAME, API, ERROR_MESSAGES } from '@/app/utils/constants';
import { getThoughtSpotHost } from './utils';
import { init, AuthType, LogLevel } from '@thoughtspot/visual-embed-sdk';

const fetchAuthToken = async (): Promise<string> => {
    const response = await fetch(API.AUTH_ENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': API.CONTENT_TYPE,
        },
    });

    if (!response.ok) {
        throw new Error(`${ERROR_MESSAGES.AUTH_TOKEN_FETCH}: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data?.token) {
        throw new Error(ERROR_MESSAGES.NO_TOKEN);
    }

    return data.token;
};

const getAuthStrategy = () => {
    return {
        authType: AuthType.TrustedAuthTokenCookieless,
        getAuthToken: fetchAuthToken,
        username: USERNAME,
    };
};

export const authenticate = async (): Promise<void> => {
    try {
        await init({
            thoughtSpotHost: getThoughtSpotHost(),
            ...getAuthStrategy(),
            autoLogin: true,
            disableTokenVerification: true,
            logLevel: LogLevel.DEBUG,
        });
    } catch (error) {
        console.error('Authentication failed:', error);
        throw new Error(ERROR_MESSAGES.AUTH_INIT_FAILED);
    }
};
