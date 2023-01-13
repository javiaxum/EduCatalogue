import { iscedCore } from "./iscedSpecialty";

export interface SpecialtyCore {
    id: string;
    name: string;
    iscedCores: iscedCore[];
}

export class SpecialtyCore implements SpecialtyCore {
    constructor(init?: SpecialtyCore | Partial<SpecialtyCore>) {
        Object.assign(this, init);
    }
}
