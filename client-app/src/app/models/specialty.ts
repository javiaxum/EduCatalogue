import { EducationalComponent } from "./educationalComponent";
import { SpecialtyCore } from "./specialtyCore";

export interface Specialty {
    id: string;
    specialtyCore: SpecialtyCore;
    description: string;
    ECTScredits: number;
    degree: string;
    components: EducationalComponent[];
}

export class Specialty implements Specialty {
    constructor(init?: SpecialtyFormValues) {
        Object.assign(this, init);
    }
}

export class SpecialtyFormValues {
    id?: string = undefined;
    specialtyCore: SpecialtyCore = new SpecialtyCore();
    description: string = '';
    ECTScredits: number = 0;
    degree: string = '';

    constructor(specialty?: SpecialtyFormValues) {
        if(specialty) {
            this.id = specialty.id;
            this.specialtyCore = specialty.specialtyCore;
            this.description = specialty.description;
            this.ECTScredits = specialty.ECTScredits;
            this.degree = specialty.degree;
        }
    }
}