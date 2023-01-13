import { EducationalComponent } from "./educationalComponent";
import { SpecialtyCore } from "./specialtyCore";

export interface Specialty {
    id: string;
    localSpecialtyCode: string;
    description: string;
    ectsCredits: number;
    degree: string;
    priceUAH: number;
    statrtsAt: Date;
    endsAt: Date;
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
    localBranchCode: string = '';
    localBranchName: string = '';
    iscedSpecialtyCode: string = '';
    description: string = '';
    ectsCredits: number = 0;
    priceUAH: number = 0;
    degree: string = '';

    constructor(specialty?: SpecialtyFormValues | Specialty) {
        if (specialty) {
            this.id = specialty.id;
            this.localSpecialtyCode = specialty.localSpecialtyCode;
            this.description = specialty.description;
            this.ectsCredits = specialty.ectsCredits;
            this.priceUAH = specialty.priceUAH;
            this.degree = specialty.degree;
        }
    }
}