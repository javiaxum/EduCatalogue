export interface City {
    id: number;
    name: string;
    regionId: number;
    institutionsCount: number;
}

export class City implements City {
    constructor(init?: City) {
        Object.assign(this, init);
    }
}