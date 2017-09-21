import { DynamicElement } from '../elements/dynamic-element';

export class DynamicFormGroup {

    public _elementsArray: (DynamicFormGroup | DynamicElement)[];
    public renderer: any;

    public cssClass: string;

    constructor(public id?: string) {

    }

    elements(elements: (DynamicFormGroup | DynamicElement)[] = []) {
        this._elementsArray = elements;
        return this;
    }

    setControlsRenderer(renderer) {
        this.renderer = renderer;
        return this;
    }

    setCssClass(cssClass: string) {
        this.cssClass = cssClass;
        return this;
    }
}
