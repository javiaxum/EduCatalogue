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
    location: string;
    socialAccount1: string;
    socialAccount2: string;
    socialAccount3: string;
    company: string;
    reviews: Review[];
    managedInstitutions: ManagedInstitution[];
    pendingChanges: PendingChange[];
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

export interface PendingChange {
    id: string,
    name: string,
    institutionName: string,
    titleImageUrl: string,
}

export interface UserRegistryItem {
    username: string;
    displayName: string;
    avatar?: Image;
    location: string;
    socialAccount1: string;
    socialAccount2: string;
    socialAccount3: string;
    company: string;
}

export class ProfileInfoFormValues {
    displayName: string = '';
    location: string = '';
    socialAccount1: string = '';
    socialAccount2: string = '';
    socialAccount3: string = '';
    company: string = '';

    constructor(profileInfoFormValues?: Profile | ProfileInfoFormValues) {
        if (profileInfoFormValues) {
            if (profileInfoFormValues.displayName)
                this.displayName = profileInfoFormValues.displayName;
            if (profileInfoFormValues.location)
                this.location = profileInfoFormValues.location;
            if (profileInfoFormValues.socialAccount1)
                this.socialAccount1 = profileInfoFormValues.socialAccount1;
            if (profileInfoFormValues.socialAccount2)
                this.socialAccount2 = profileInfoFormValues.socialAccount2;
            if (profileInfoFormValues.socialAccount3)
                this.socialAccount3 = profileInfoFormValues.socialAccount3;
            if (profileInfoFormValues.company)
                this.company = profileInfoFormValues.company;
        }
    }
}