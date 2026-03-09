import { USERNAME } from '@/app/utils/constants';
import { getThoughtSpotHost } from './utils';
import { init, AuthType, LogLevel } from '@thoughtspot/visual-embed-sdk';

const fetchAuthToken = async (): Promise<string> => {
    const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch auth token: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data?.token) {
        throw new Error('No token received in response');
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
        throw new Error('Failed to initialize authentication');
    }
};
