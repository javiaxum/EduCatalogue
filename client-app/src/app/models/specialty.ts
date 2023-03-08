import { EducationalComponent } from "./educationalComponent";

export interface Specialty {
    id: string;
    localSpecialtyCode: string;
    ectsCredits: number;
    description: string;
    degreeId: number;
    enrolledStudentsCount: number;
    graduateEmploymentRate: number;
    priceUAH: number;
    nonPaidEducationAvailable: boolean;
    startYear: number;
    endYear: number;
    componentDTOs: EducationalComponent[];
    languageIds: string[];
    studyFormIds: number[];
    skillIds: number[];
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
    degreeId: number = 1;
    enrolledStudentsCount: number = 0;
    graduateEmploymentRate: number = 0;
    componentDTOs: EducationalComponent[] = [];
    languageIds: string[] = [];
    studyFormIds: number[] = [];
    skillIds: number[] = [];

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
            this.componentDTOs = specialty.componentDTOs;
            this.languageIds = specialty.languageIds;
            this.studyFormIds = specialty.studyFormIds;
            this.skillIds = specialty.skillIds;
        }
    }
}