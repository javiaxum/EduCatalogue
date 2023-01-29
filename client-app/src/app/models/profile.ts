import { Review } from "./review";
import { User } from "./user";

export interface Profile {
    username: string;
    displayName: string;
    email: string;
    emailConfirmed: boolean
    twoFactorEnabled: boolean;
    image?: string;
    images?: Image[];
    reviews: Review[];
    managedInstitutions: ManagedInstitution[];
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
}

export interface ManagedInstitution {
    id: string,
    name: string,
}