import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicElement } from './dynamic-element';
import { DynamicFormService } from '../dynamic-form.service';

@Component({
    selector: 'dynamic-form-element',
    templateUrl: './dynamic-form-element.component.html'
})
export class DynamicFormElementComponent {
    @Input() formGroup: FormGroup;
    @Input() element: DynamicElement;

    formRenderer: any;

    constructor(private dynamicFormService: DynamicFormService) {

    }

    hasRenderer() {
        if (this.element.renderer) {
            this.formRenderer = this.element.renderer;
            return true;
        } else if (this.dynamicFormService.formRenderer) {
            this.formRenderer = this.dynamicFormService.formRenderer;
            return true;
        }
        return false;
    }

}
