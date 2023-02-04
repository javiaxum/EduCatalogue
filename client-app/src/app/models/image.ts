export interface Image {
    id: string,
    url: string,
}

export class Image implements Image {
    constructor(init?: Image) {
        Object.assign(this, init);
    }
}