import { PASSWORD, USERNAME } from '@/app/utils/constants';
import { fetchAuthToken, getThoughtSpotHost } from './utils';
import { init, AuthType, LogLevel } from '@thoughtspot/visual-embed-sdk';

const getAuthStrategy = () => {
    return {
        authType: AuthType.TrustedAuthTokenCookieless,
        getAuthToken: fetchAuthToken,
        username: USERNAME,
        password: PASSWORD,
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
