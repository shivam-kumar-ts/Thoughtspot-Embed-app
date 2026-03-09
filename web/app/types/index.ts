import { USERNAME } from "@/app/utils/constants";

interface UserType {
    name: string;
}

const _DUMMY_USER: UserType = {
    name: USERNAME,
};

export {
    type UserType,
    _DUMMY_USER,
};