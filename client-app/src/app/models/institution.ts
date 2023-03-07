import { City } from "./city";
import { Profile } from "./profile";
import { Region } from "./region";
import { Review } from "./review";
import { Specialty } from "./specialty";
import { Image } from "./image";


export interface Institution {
    id: string;
    name: string;
    description: string;
    studentCount: number;
    accreditation: number;
    cityId: number;
    regionId: number;
    latitude: number;
    longtitude: number;
    streetAddress: string;
    siteURL: string;
    titleImageId: string;
    emblemImageId: string;
    backgroundImageId: string;
    titleImageUrl: string;
    backgroundImageUrl: string;
    contactInformation: string;
    rating: number;
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
    accreditation: number = 0;
    cityId: number = 0;
    regionId?: number = 0;
    latitude: number = 0.0;
    longtitude: number = 0.0;
    streetAddress: string = '';
    titleImageId: string = '';
    emblemImageId: string = '';
    backgroundImageId: string = '';
    siteURL: string = '';
    contactInformation: string = '';

    constructor(institution?: InstitutionFormValues) {
        if (institution) {
            this.id = institution.id;
            this.name = institution.name;
            this.description = institution.description;
            this.studentCount = institution.studentCount;
            this.accreditation = institution.accreditation;
            this.cityId = institution.cityId;
            this.regionId = institution.regionId;
            this.latitude = institution.latitude;
            this.longtitude = institution.longtitude;
            this.streetAddress = institution.streetAddress;
            this.titleImageId = institution.titleImageId;
            this.emblemImageId = institution.emblemImageId;
            this.backgroundImageId = institution.backgroundImageId;
            this.siteURL = institution.siteURL;
            this.contactInformation = institution.contactInformation;
        }
    }
}