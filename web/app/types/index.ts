import { USERNAME } from "@/app/utils/constants";

interface UserType {
    name: string;
}

const _DUMMY_USER: UserType = {
    name: USERNAME,
};


const NOTIFICATION_TYPE = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
} as const;

export type NotificationType = (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];

export {
    type UserType,
    _DUMMY_USER,
    NOTIFICATION_TYPE,
};