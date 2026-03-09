import { HOST } from '@/app/utils/constants';

const getThoughtSpotHost = () => {
    return HOST;
};

const generateNotificationId = () => {
    return Math.random().toString(36).substring(2, 15);
};

export { getThoughtSpotHost, generateNotificationId };
