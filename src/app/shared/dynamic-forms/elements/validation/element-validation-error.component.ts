import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFormValidator } from './dynamic-form.validator';

@Component({
    selector: 'element-validation-error',
    templateUrl: './element-validation-error.component.html'
})
export class ElementValidationErrorComponent {
    @Input() control: FormControl;

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
