import { EducationalComponent } from "./educationalComponent";
import { SpecialtyCore } from "./specialtyCore";

export interface Specialty {
    id: string;
    specialtyCore: SpecialtyCore;
    description: string;
    ectsCredits: number;
    degree: string;
    components: EducationalComponent[];
}

export class Specialty implements Specialty {
    constructor(init?: SpecialtyFormValues | Specialty) {
        Object.assign(this, init);
    }
}

export class SpecialtyFormValues {
    id?: string = undefined;
    institutionId: string = '';
    uaCode: string = '';
    iscedCode: string = '';
    description: string = '';
    ectsCredits: number = 0;
    degree: string = '';

    constructor(specialty?: SpecialtyFormValues | Specialty) {
        if(specialty) {
            this.id = specialty.id;
            // this.institutionId = specialty.institutionId;
            // this.uaCode = specialty.uaCode;
            this.description = specialty.description;
            this.ectsCredits = specialty.ectsCredits;
            this.degree = specialty.degree;
        }
    }
}