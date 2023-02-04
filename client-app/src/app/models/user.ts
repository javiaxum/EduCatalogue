import { Review } from "./review";
import { Image } from "./image";

export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: Image;
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: string;
    displayName?: string;
}