import { number } from "yup";
import { EducationalComponent } from "./educationalComponent";
import { SpecialtyCore } from "./specialtyCore";

export interface Specialty {
    id: string;
    localSpecialtyCode: string;
    description: string;
    ectsCredits: number;
    degree: string;
    priceUAH: number;
    nonPaidEducationAvailable: boolean;
    startYear: number;
    endYear: number;
    components: EducationalComponent[];
}

export class Specialty implements Specialty {
    constructor(init?: SpecialtyFormValues | Specialty) {
        Object.assign(this, init);
    }
}

export class SpecialtyFormValues {
    id?: string = undefined;
    localSpecialtyCode: string = '';
    description: string = '';
    ectsCredits: number = 0;
    priceUAH: number = 0;
    nonPaidEducationAvailable: boolean = false;
    startYear: number = 0;
    endYear: number = 0;
    degree: string = '';

    constructor(specialty?: SpecialtyFormValues | Specialty) {
        if (specialty) {
            this.id = specialty.id;
            this.localSpecialtyCode = specialty.localSpecialtyCode;
            this.description = specialty.description;
            this.ectsCredits = specialty.ectsCredits;
            this.priceUAH = specialty.priceUAH;
            this.nonPaidEducationAvailable = specialty.nonPaidEducationAvailable;
            this.startYear = specialty.startYear;
            this.endYear = specialty.endYear;
            this.degree = specialty.degree;
        }
    }
}