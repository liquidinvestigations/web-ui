import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicElement } from './dynamic-element';
import { DynamicElementRendererBase } from './render/dynamic-element-renderer.base';
import { DynamicFormService } from '../dynamic-form.service';

@Component({
    selector: 'form-element',
    templateUrl: './form-element.component.html',
    styleUrls: [ './form-element.component.scss' ]
})
export class FormElementComponent extends DynamicElementRendererBase {
    @Input() fg: FormGroup;
    @Input() element: DynamicElement;
    @Output() elementEvent: EventEmitter<any> = new EventEmitter();

    constructor(protected dynamicFormService: DynamicFormService) {
        super(dynamicFormService);
    }
}
