import { PASSWORD, USERNAME } from '@/app/utils/constants';
import { fetchAuthToken, getThoughtSpotHost } from './utils';
import { init, AuthType } from '@thoughtspot/visual-embed-sdk';

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
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Authentication failed:', error);
        throw new Error('Failed to initialize authentication');
    }
};
