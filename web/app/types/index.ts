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

const CHAT_ROLE = {
    USER: "user",
    AGENT: "agent",
} as const;

export type Role = (typeof CHAT_ROLE)[keyof typeof CHAT_ROLE];

interface Message {
    id: string;
    role: Role;
    text: string;
    container?: HTMLDivElement;
    error?: string;
    timestamp: Date;
}

export {
    type UserType,
    _DUMMY_USER,
    NOTIFICATION_TYPE,
    type Message,
    CHAT_ROLE,
};