export interface SpecialtyCore {
    id: string;
    name: string;
    uaCode: string;
    iscedCode: string;
    uaBranchCode: string;
}

export class SpecialtyCore implements SpecialtyCore {
    constructor(init?: SpecialtyCore | Partial<SpecialtyCore>) {
        Object.assign(this, init);
    }
}
