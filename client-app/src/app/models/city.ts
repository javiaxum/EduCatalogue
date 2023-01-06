export interface City {
    id: string;
    name: string;
}

export class City implements City {
    constructor(init?: City) {
        Object.assign(this, init);
    }
}