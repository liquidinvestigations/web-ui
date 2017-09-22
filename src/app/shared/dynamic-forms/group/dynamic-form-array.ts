import { DynamicElement } from '../elements/dynamic-element';
import { DynamicFormGroup } from './dynamic-form-group';

export class DynamicFormArray {

    public _elementsArray: (DynamicFormGroup | DynamicElement)[];
    public renderer: any;

    public cssClass: string;

    public getterArguments = [];

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
