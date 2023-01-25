import { City } from "./city";
import { Profile } from "./profile";
import { Review } from "./review";
import { Specialty } from "./specialty";

export interface Institution {
    id: string;
    name: string;
    description: string;
    studentCount: number;
    cityId: string;
    streetAddress: string;
    siteURL: string;
    titleImage: string;
    emblemImage: string;
    contactInformation: string;
    managers: Profile[];
    specialties: Specialty[];
    reviews: Review[];
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
    streetAddress: string = '';
    siteURL: string = '';
    titleImage: string = '';
    emblemImage: string = '';
    contactInformation: string = '';

    constructor(institution?: InstitutionFormValues) {
        if (institution) {
            this.id = institution.id;
            this.name = institution.name;
            this.description = institution.description;
            this.studentCount = institution.studentCount;
            this.cityId = institution.cityId;
            this.streetAddress = institution.streetAddress;
            this.siteURL = institution.siteURL;
            this.titleImage = institution.titleImage;
            this.emblemImage = institution.emblemImage;
            this.contactInformation = institution.contactInformation;
        }
    }
}