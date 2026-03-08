import { AuthTokenResponse } from '@/app/types';
import { HOST, USERNAME, PASSWORD, VALIDITY_TIME_IN_SEC } from '@/app/utils/constants';

const getThoughtSpotHost = () => {
    return HOST;
};

const fetchAuthToken = async (): Promise<string> => {
    const response = await fetch(`${getThoughtSpotHost()}/api/rest/2.0/auth/token/full`, {
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            username: USERNAME,
            validity_time_in_sec: VALIDITY_TIME_IN_SEC,
            auto_create: false,
            password: PASSWORD,
        }),
        method: 'POST',
        credentials: 'omit',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch auth token: ${response.statusText}`);
    }

    const data: AuthTokenResponse = await response.json();
    if (!data?.token) {
        throw new Error('No token received in response');
    }

    return data.token;
};

export {
    getThoughtSpotHost,
    fetchAuthToken,
};
