import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DynamicFormControl } from '../builder/dynamic-form-control';
import { DynamicElementRendererBase } from './render/dynamic-element-renderer.base';
import { DynamicFormGroup } from "../builder/dynamic-form-group";
import { DynamicFormArray } from '../builder/dynamic-form-array';
import { DynamicFormService } from '../dynamic-form.service';

@Component({
    selector: 'dynamic-element',
    templateUrl: './dynamic-element.component.html',
    styleUrls: [
        './dynamic-element.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class DynamicElementComponent extends DynamicElementRendererBase {
    @Input() fg: ( DynamicFormGroup | DynamicFormArray );
    @Input() control: DynamicFormControl;

    constructor(public dynamicFormService: DynamicFormService) {
        super();
    }

    private removeControl() {
        if (this.fg instanceof DynamicFormArray) {
            this.fg.removeAt(this.fg.controls.indexOf(this.control));
            this.dynamicFormService.removeElementRefference(this.control);
        }
    }

}
