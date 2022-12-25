export interface SpecialtyCore {
    id: string;
    name: string;
    uaCode: string;
    iscedCode: string;
}

export class SpecialtyCore implements SpecialtyCore {
    constructor(init?: SpecialtyCore) {
        Object.assign(this, init);
    }
}
