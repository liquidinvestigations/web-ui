import { DynamicElement } from '../elements/dynamic-element';
import { DynamicFormArray } from './dynamic-form-array';

export class DynamicFormGroup {

    public _elementsArray: (DynamicFormGroup | DynamicElement | DynamicFormArray)[];
    public renderer: any;

    public validator: Function;

    public cssClass: string;

    constructor(public id?: string) {

    }

    elements(elements: (DynamicFormGroup | DynamicElement | DynamicFormArray)[] = []) {
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

    setValidator(validators: any) {
        this.validator = validators;
        return this;
    }
}
