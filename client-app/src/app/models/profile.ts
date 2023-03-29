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
    location?: string;
    socialAccounts?: string;
    company?: string;
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

export class ProfileInfoFormValues {
    displayName: string = '';
    location?: string = '';
    socialAccounts?: string = '';
    company?: string = '';

    constructor(profileInfoFormValues?: Profile | ProfileInfoFormValues) {
        if (profileInfoFormValues) {
            this.displayName = profileInfoFormValues.displayName;
            this.location = profileInfoFormValues.location;
            this.socialAccounts = profileInfoFormValues.socialAccounts;
            this.company = profileInfoFormValues.company;
        }
    }
}