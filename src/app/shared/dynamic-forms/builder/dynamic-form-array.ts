import { FormArray, ValidatorFn } from '@angular/forms';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormControl } from './dynamic-form-control';

export class DynamicFormArray extends FormArray {

    elementGenerate: (DynamicFormGroup | DynamicFormControl);
    groupCssClass: string;
    renderer: any;

    toggleInteraction: boolean = false;
    maxElements: number;

    _isHidden: ( boolean | Function ) = false;

    constructor(public id?: string) {
        super([]);
    }

    elements(elements: (DynamicFormGroup | DynamicFormControl)[] = []) {
        for (let i = 0; i < elements.length; i++) {
            this.addElement(elements[i]);
        }
        return this;
    }

    generateElement(element: (DynamicFormGroup | DynamicFormControl)) {
        this.elementGenerate = element;
        return this;
    }

    patchValue(value: any, options?: Object) {

        if (this.elementGenerate) {
            this.controls = [];
            for (let i in value) {
                if (value.hasOwnProperty(i)) {
                    this.addElement(Object.create(this.elementGenerate));
                }
            }
        }

        super.patchValue(value, options);
    }

    addNew() {
        this.addElement(Object.create(this.elementGenerate));
    }

    private addElement(element: (DynamicFormGroup | DynamicFormControl), index?: (number | string)) {

        if (index === undefined) {
            index = this.controls.length;
        }

        if (element instanceof DynamicFormControl && element.groupWrap) {
            this.push(new DynamicFormGroup().elements([element]));
        } else {
            this.push(element.setId(index + ''));
        }
    }

    setArrayCssClass(cssClass: string) {
        this.groupCssClass = cssClass;
        return this;
    }

    enableInteraction(toggleInteraction: boolean = true) {
        this.toggleInteraction = toggleInteraction;
        return this;
    }

    setMaxElements(maxElements: number) {
        this.maxElements = maxElements;
        return this;
    }

    get isHidden(): boolean {
        if (this._isHidden instanceof Function) {
            return this._isHidden();
        }
        return this._isHidden;
    }

    setIsHidden(isHidden: ( boolean | Function )) {
        this._isHidden = isHidden;
        return this;
    }

    reachedMaxElements() {
        return this.maxElements === this.controls.length;
    }

    setValidators(newValidator: ValidatorFn | ValidatorFn[] | null){
        super.setValidators(newValidator);
        return this;
    }

    setRenderer(renderer: any) {
        this.renderer = renderer;
        return this;
    }

    setValue(value: any, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }) {
        super.setValue(value, options);
        return this;
    }
}
