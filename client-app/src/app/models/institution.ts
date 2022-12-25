import { Profile } from "./profile";
import { Specialty } from "./specialty";

export interface Institution {
    id: string;
    name: string;
    description: string;
    address: string;
    siteURL: string;
    titleImage: string;
    managers: Profile[];
    specialties: Specialty[];
}

export class Institution implements Institution {
    constructor(init?: InstitutionFormValues) {
        Object.assign(this, init);
    }
}

export class InstitutionFormValues {
    id?: string = undefined;
    name: string = '';
    description: string = '';
    address: string = '';
    siteURL: string = '';
    titleImage: string = '';

    constructor(institution?: InstitutionFormValues) {
        if(institution) {
            this.id = institution.id;
            this.name = institution.name;
            this.description = institution.description;
            this.address = institution.address;
            this.siteURL = institution.siteURL;
            this.titleImage = institution.titleImage;
        }
    }
}