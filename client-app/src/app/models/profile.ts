import { Image } from "./image";
import { Review } from "./review";
import { User } from "./user";

export interface Profile {
    username: string;
    displayName: string;
    email: string;
    emailConfirmed: boolean
    twoFactorEnabled: boolean;
    image?: Image;
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

export interface ManagedInstitution {
    id: string,
    name: string,
    titleImageUrl: string,
}