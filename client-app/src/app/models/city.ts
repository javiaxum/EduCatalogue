export interface City {
    id: string;
    name: string;
    regionId: string;
    institutionsCount: number;
}

export class City implements City {
    constructor(init?: City) {
        Object.assign(this, init);
    }
}