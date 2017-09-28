import { Input } from '@angular/core';
import { DynamicFormControl } from '../../builder/dynamic-form-control';
import { DynamicFormGroup } from '../../builder/dynamic-form-group';
import { DynamicFormArray } from '../../builder/dynamic-form-array';

export abstract class DynamicElementRendererBase {
    @Input() abstract control: DynamicFormControl;
    @Input() abstract fg: (DynamicFormGroup | DynamicFormArray );


    switchToText() {
        let controlType = this.control.controlType === DynamicFormControl.TYPE_PASSWORD
            ? DynamicFormControl.TYPE_TEXT
            : DynamicFormControl.TYPE_PASSWORD;

        this.control.setControlType(controlType);
    }
}
