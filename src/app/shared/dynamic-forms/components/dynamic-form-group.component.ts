import { Component, Input } from '@angular/core';
import { DynamicFormGroup } from '../builder/dynamic-form-group';
import { DynamicFormControl } from '../builder/dynamic-form-control';
import { DynamicFormService } from '../dynamic-form.service';
import { DynamicFormArray } from '../builder/dynamic-form-array';

@Component({
    selector: 'dynamic-from-group',
    templateUrl: './dynamic-form-group.component.html',
})
export class DynamicFormGroupComponent {
    @Input() fg: DynamicFormGroup;

    constructor(
        public dynamicFormService: DynamicFormService) {
    }

    private isFormGroup(group: any) {
        return group instanceof DynamicFormGroup;
    }

    private isFormArray(array: any) {
        return array instanceof DynamicFormArray;
    }

    private isControl(control: any) {
        if (control instanceof DynamicFormControl) {
            this.dynamicFormService.addElementReference(control);
            return true;
        }
        return false;
    }

    private getControls(group) {
        let controls = [];

        if (group.controls) {
            for (let i in group.controls) {
                controls.push(group.controls[i]);
            }
        }

        return controls;
    }

}