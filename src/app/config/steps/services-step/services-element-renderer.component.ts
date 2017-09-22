import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DynamicElementRendererBase } from '../../../shared/dynamic-forms/elements/render/dynamic-element-renderer.base';
import { DynamicElement } from '../../../shared/dynamic-forms/elements/dynamic-element';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';

@Component({
    templateUrl: './services-element-renderer.component.html',
    styleUrls: ['./services-element-renderer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ServicesElementRendererComponent extends DynamicElementRendererBase {
    @Input() element: DynamicElement;
    @Input() fg: FormGroup;

    constructor(protected dynamicFormService: DynamicFormService) {
        super(dynamicFormService);
    }
}
