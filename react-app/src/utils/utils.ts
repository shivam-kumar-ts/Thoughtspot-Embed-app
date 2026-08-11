import { HOST } from './constants';

const getThoughtSpotHost = () => {
    return HOST;
};

const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
};

export { getThoughtSpotHost, generateRandomId };
