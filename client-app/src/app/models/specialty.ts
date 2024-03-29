import { EducationalComponent } from "./educationalComponent";

export interface Specialty {
    id: string;
    approved: boolean;
    visible: boolean;
    institutionId: string;
    description: string;
    localSpecialtyCode: string;
    degreeId: number;
    tuitionUSD: number;
    freeEducation: boolean;
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
    visible: boolean = false;
    localSpecialtyCode: string = '';
    description: string = '';
    degreeId: number = 1;
    tuitionUSD: number = 0;
    freeEducation: boolean = false;
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
            this.visible = specialty.visible;
            this.description = specialty.description;
            this.degreeId = specialty.degreeId;
            this.tuitionUSD = specialty.tuitionUSD;
            this.freeEducation = specialty.freeEducation;
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