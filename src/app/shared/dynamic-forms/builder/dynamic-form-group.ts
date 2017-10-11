import { FormGroup, ValidatorFn } from '@angular/forms';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormControl } from './dynamic-form-control';

export class DynamicFormGroup extends FormGroup {

    groupCssClass: string;

    constructor(public id?: string) {
        super({});
    }

    elements(elements: (DynamicFormGroup | DynamicFormControl | DynamicFormArray)[] = []) {
        for (let element of elements) {
            this.addControl(element.id, element);
        }

        return this;
    }

    setId(id: string) {
        this.id = id;
        return this;
    }

    setGroupCssClass(groupCssClass: string) {
        this.groupCssClass = groupCssClass;
        return this;
    }

    setValidators(newValidator: ValidatorFn | ValidatorFn[] | null){
        super.setValidators(newValidator);
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

    patchValue(value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }) {
        super.patchValue(value, options);
        return this;
    }

}
