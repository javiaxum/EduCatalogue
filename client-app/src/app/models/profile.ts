import { Image } from "./image";
import { Review } from "./review";
import { User } from "./user";

export interface Profile {
    username: string;
    displayName: string;
    email: string;
    emailConfirmed: boolean
    twoFactorEnabled: boolean;
    avatar?: Image;
    reviews: Review[];
    managedInstitutions: ManagedInstitution[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.avatar = user.avatar;
    }
}

export interface ManagedInstitution {
    id: string,
    name: string,
    titleImageUrl: string,
}