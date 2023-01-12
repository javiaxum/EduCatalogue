export interface SpecialtyCore {
    id: string;
    localSpecialtyCode: string;
    localSpecialtyName: string;
    localBranchCode: string;
    iscedSpecialtyCode: string;
    iscedSpecialtyName: string;
}

export class SpecialtyCore implements SpecialtyCore {
    constructor(init?: SpecialtyCore | Partial<SpecialtyCore>) {
        Object.assign(this, init);
        this.localBranchCode = this.localSpecialtyCode.slice(0,2);
    }
}
