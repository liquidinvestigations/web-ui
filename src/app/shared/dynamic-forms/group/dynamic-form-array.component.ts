import { Component, Input } from '@angular/core';
import { DynamicFormArray } from './dynamic-form-array';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'dynamic-form-array',
    templateUrl: './dynamic-form-array.component.html'
})
export class DynamicFormArrayComponent {
    @Input() fg: FormGroup;
    @Input() dynamicFormArray: DynamicFormArray;

    constructor() {}

}
