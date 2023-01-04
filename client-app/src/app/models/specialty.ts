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
    iscedCode: string = '';
    uaCode: string = '';
    specialtySelect: string = '';
    specialtyCore: SpecialtyCore = new SpecialtyCore({});
    description: string = '';
    ectsCredits: number = 0;
    degree: string = '';

    constructor(specialty?: SpecialtyFormValues | Specialty) {
        if (specialty) {
            this.id = specialty.id;
            this.specialtyCore = specialty.specialtyCore;
            this.specialtySelect = `${specialty.specialtyCore.uaCode} ${specialty.specialtyCore.name}`
            this.description = specialty.description;
            this.ectsCredits = specialty.ectsCredits;
            this.degree = specialty.degree;
            this.iscedCode = specialty.specialtyCore.iscedCode;
            this.uaCode = specialty.specialtyCore.uaCode;
        }
    }
}