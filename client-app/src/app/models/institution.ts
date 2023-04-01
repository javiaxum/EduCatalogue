export interface Institution {
    id: string;
    name: string;
    approved: boolean;
    visible: boolean;
    description: string;
    accreditation: number;
    typeId: number;
    cityId: number;
    regionId: number;
    latitude: number;
    longtitude: number;
    streetAddress: string;
    siteURL: string;
    titleImageUrl: string;
    emblemImageUrl: string;
    backgroundImageUrl: string;
    contactInformation: string;
    undergraduatesEnrolled: number;
    rating: number;
    reviewsCount: number;
    specialtiesCount: number;
    acceptanceRate: number;
    graduationRate: number;
    graduateEmploymentRate: number;
    averageTuitionUAH: number;
    scholarship: boolean;
    studyFormIds: number[];
    languageIds: string[];
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
    accreditation: number = 0;
    typeId: number = 0;
    cityId: number = 0;
    regionId: number = 0;
    latitude: number = 0.0;
    longtitude: number = 0.0;
    streetAddress: string = '';
    siteURL: string = '';
    contactInformation: string = '';
    studyFormIds: number[] = [];
    languageIds: string[] = [];

    constructor(institution?: InstitutionFormValues | Institution) {
        if (institution) {
            this.id = institution.id;
            this.name = institution.name;
            this.description = institution.description;
            this.accreditation = institution.accreditation;
            this.typeId = institution.typeId;
            this.cityId = institution.cityId;
            this.regionId = institution.regionId;
            this.latitude = institution.latitude;
            this.longtitude = institution.longtitude;
            this.streetAddress = institution.streetAddress;
            this.siteURL = institution.siteURL;
            this.contactInformation = institution.contactInformation;
            this.studyFormIds = institution.studyFormIds;
            this.languageIds = institution.languageIds;
        }
    }
}