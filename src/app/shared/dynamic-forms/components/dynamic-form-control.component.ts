import { Component, Input, OnInit } from '@angular/core';
import { DynamicFormControl } from '../builder/dynamic-form-control';
import { DynamicFormService } from '../dynamic-form.service';
import { DynamicFormGroup } from '../builder/dynamic-form-group';

@Component({
    selector: 'dynamic-form-control',
    templateUrl: './dynamic-form-control.component.html',
    styles: [
        `
            .form-group {
                height: 60px;
                margin-bottom: 0;
            }
        `
    ]
})
export class DynamicFormControlComponent implements OnInit {


    @Input() fg: DynamicFormGroup;
    @Input() control: DynamicFormControl;

    formRenderer: any;

    constructor(public dynamicFormService: DynamicFormService) {
    }


    hasRenderer() {
        if (this.control.renderer === false) {
            return false;
        } else if (this.control.renderer) {
            this.formRenderer = this.control.renderer;
            return true;
        }

        return false;
    }

    ngOnInit() {
        Object.assign(this.control, this.dynamicFormService.defaults);
    }

}
