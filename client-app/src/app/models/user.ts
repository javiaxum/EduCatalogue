import { Review } from "./review";
import { Image } from "./image";

export interface User {
    username: string;
    displayName: string;
    token: string;
    avatar?: Image;
    isOperator: boolean;
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: string;
    displayName?: string;
    rememberMe?: boolean;
}