import { Component, Input } from '@angular/core';
import { DynamicFormValidator } from '../validation/dynamic-form.validator';
import { DynamicFormControl } from '../builder/dynamic-form-control';

@Component({
    selector: 'dynamic-form-validation',
    templateUrl: './dynamic-form-validation.component.html'
})
export class DynamicFormValidationComponent  {
    @Input() control: DynamicFormControl;

    get validationMessage() {

        let errors = this.control.errors;

        for (let errorName in errors) {
            if (
                errorName in errors &&
                this.control.touched
            ) {
                return DynamicFormValidator.getValidatorMessage(errorName, errors[errorName]);
            }
        }

        return false;
    }

}
