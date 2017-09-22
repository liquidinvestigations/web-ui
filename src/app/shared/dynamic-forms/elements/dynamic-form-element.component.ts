import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicElement } from './dynamic-element';
import { DynamicFormService } from '../dynamic-form.service';

@Component({
    selector: 'dynamic-form-element',
    templateUrl: './dynamic-form-element.component.html',
    styles: [
        `.divider-holder hr { margin-top: 20px; margin-bottom: 0; }`
    ]
})
export class DynamicFormElementComponent {
    @Input() fg: FormGroup;
    @Input() element: DynamicElement;

    formRenderer: any;

    constructor(private dynamicFormService: DynamicFormService) {

    }

    hasRenderer() {
        if (this.element.renderer === false) {
            return false;
        } else if (this.element.renderer) {
            this.formRenderer = this.element.renderer;
            return true;
        } else if (this.dynamicFormService.formRenderer) {
            this.formRenderer = this.dynamicFormService.formRenderer;
            return true;
        }
        return false;
    }

}
