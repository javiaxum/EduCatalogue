import { City } from "./city";
import { Image, Profile } from "./profile";
import { Region } from "./region";
import { Review } from "./review";
import { Specialty } from "./specialty";

export interface Institution {
    id: string;
    name: string;
    description: string;
    studentCount: number;
    cityId: string;
    cityName: string;
    streetAddress: string;
    siteURL: string;
    titleImageId: string;
    backgroundImageId: string;
    titleImageUrl: string;
    backgroundImageUrl: string;
    contactInformation: string;
    managers: Profile[];
    specialties: Specialty[];
    reviews: Review[];
    images: Image[];
}

export class Institution implements Institution {
    constructor(init?: InstitutionFormValues | Institution) {
        Object.assign(this, init);
    }
}

export class InstitutionFormValues {
    id?: string = undefined;
    name: string = '';
    description: string = '';
    studentCount: number = 0;
    cityId: string = '';
    regionId?: string = '';
    streetAddress: string = '';
    titleImageId: string = '';
    backgroundImageId: string = '';
    siteURL: string = '';
    contactInformation: string = '';

    constructor(institution?: InstitutionFormValues) {
        if (institution) {
            this.id = institution.id;
            this.name = institution.name;
            this.description = institution.description;
            this.studentCount = institution.studentCount;
            this.cityId = institution.cityId;
            this.streetAddress = institution.streetAddress;
            this.titleImageId = institution.titleImageId;
            this.backgroundImageId = institution.backgroundImageId;
            this.siteURL = institution.siteURL;
            this.contactInformation = institution.contactInformation;
        }
    }
}