import { EducationalComponent } from "./educationalComponent";

export interface Specialty {
    id: string;
    localSpecialtyCode: string;
    description: string;
    ectsCredits: number;
    degreeId: number;
    enrolledStudentsCount: number;
    graduateEmploymentRate: number;
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
    degreeId: number = 0;
    enrolledStudentsCount: number = 0;
    graduateEmploymentRate: number = 0;

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
            this.degreeId = specialty.degreeId;
            this.enrolledStudentsCount = specialty.enrolledStudentsCount;
            this.graduateEmploymentRate = specialty.graduateEmploymentRate;
        }
    }
}