import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DynamicElementRendererBase } from '../../../shared/dynamic-forms/components/render/dynamic-element-renderer.base';
import { DynamicFormControl } from '../../../shared/dynamic-forms/builder/dynamic-form-control';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormArray } from '../../../shared/dynamic-forms/builder/dynamic-form-array';

@Component({
    templateUrl: './services-element-renderer.component.html',
    styleUrls: ['./services-element-renderer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ServicesElementRendererComponent extends DynamicElementRendererBase {
    @Input() control: DynamicFormControl;
    @Input() fg: DynamicFormGroup | DynamicFormArray;

}
