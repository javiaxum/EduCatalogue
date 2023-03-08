export interface EducationalComponent {
    id: string;
    componentCoreId: number;
    name: string;
    ectsCredits: number;
    isOptional: boolean;
}

export class EducationalComponent implements EducationalComponent {
    constructor(init?: EducationalComponent | ComponentFormValues) {
        Object.assign(this, init);
    }
}


export class ComponentFormValues {
    id?: string = undefined;
    componentCoreId: number = 0;
    name: string = '';
    ectsCredits: number = 0;
    isOptional: boolean = false;

    constructor(component?: ComponentFormValues | EducationalComponent) {
        if (component) {
            this.id = component.id;
            this.componentCoreId = component.componentCoreId;
            this.name = component.name;
            this.ectsCredits = component.ectsCredits;
            this.isOptional = component.isOptional;
        }
    }
}