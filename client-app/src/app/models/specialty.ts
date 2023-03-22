import { EducationalComponent } from "./educationalComponent";

export interface Specialty {
    id: string;
    institutionId: string;
    description: string;
    localSpecialtyCode: string;
    degreeId: number;
    tuitionUAH: number;
    scholarship: boolean;
    acceptanceRate: number;
    graduationRate: number;
    graduateEmploymentRate: number;
    undergraduatesEnrolled: number;
    ectsCredits: number;
    startYear: number;
    endYear: number;
    studyFormIds: number[];
    languageIds: string[];
    skillIds: number[];
    componentDTOs: EducationalComponent[];
}

export class Specialty implements Specialty {
    constructor(init?: SpecialtyFormValues | Specialty) {
        Object.assign(this, init);
    }
}

export class SpecialtyFormValues {
    id?: string = undefined;
    institutionId?: string = undefined;
    localSpecialtyCode: string = '';
    description: string = '';
    degreeId: number = 1;
    tuitionUAH: number = 0;
    scholarship: boolean = false;
    acceptanceRate: number = 0;
    graduationRate: number = 0;
    graduateEmploymentRate: number = 0;
    undergraduatesEnrolled: number = 0;
    ectsCredits: number = 0;
    startYear: number = 0;
    endYear: number = 0;
    studyFormIds: number[] = [];
    languageIds: string[] = [];
    skillIds: number[] = [];
    componentDTOs: EducationalComponent[] = [];

    constructor(specialty?: SpecialtyFormValues | Specialty) {
        if (specialty) {
            this.id = specialty.id;
            this.institutionId = specialty.institutionId;
            this.localSpecialtyCode = specialty.localSpecialtyCode;
            this.description = specialty.description;
            this.degreeId = specialty.degreeId;
            this.tuitionUAH = specialty.tuitionUAH;
            this.scholarship = specialty.scholarship;
            this.acceptanceRate = specialty.acceptanceRate;
            this.graduationRate = specialty.graduationRate;
            this.graduateEmploymentRate = specialty.graduateEmploymentRate;
            this.undergraduatesEnrolled = specialty.undergraduatesEnrolled;
            this.ectsCredits = specialty.ectsCredits;
            this.startYear = specialty.startYear;
            this.endYear = specialty.endYear;
            this.studyFormIds = specialty.studyFormIds;
            this.languageIds = specialty.languageIds;
            this.skillIds = specialty.skillIds;
            this.componentDTOs = specialty.componentDTOs;
        }
    }
}