import { User } from "./user";

export interface Profile {
    username: string;
    displayName: string;
    image?: string;
    images?: Image[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export interface Image {
    id: string,
    url: string,
    type: string
}