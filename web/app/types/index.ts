interface UserType {
    name: string;
}

const _DUMMY_USER: UserType = {
    name: "Shivam6862",
};

interface AuthTokenResponse {
    token: string;
}

export {
    type UserType,
    _DUMMY_USER,
    type AuthTokenResponse,
};