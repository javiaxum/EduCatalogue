import { City } from "./city";

export interface Region {
    id: number;
    name: string;
    cities: City[];
}

export class Region implements Region {
    constructor(init?: Region) {
        Object.assign(this, init);
    }
}