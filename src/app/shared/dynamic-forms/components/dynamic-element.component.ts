import { Component, Input } from '@angular/core';
import { DynamicFormControl } from '../builder/dynamic-form-control';
import { DynamicElementRendererBase } from './render/dynamic-element-renderer.base';
import { DynamicFormArray } from '../builder/dynamic-form-array';
import { DynamicFormService } from '../dynamic-form.service';
import { DynamicFormGroup } from '../builder/dynamic-form-group';

@Component({
    selector: 'dynamic-element',
    templateUrl: './dynamic-element.component.html',
    styleUrls: [
        './dynamic-element.component.scss'
    ],
})
export class DynamicElementComponent extends DynamicElementRendererBase {
    @Input() fg: ( DynamicFormGroup | DynamicFormArray );
    @Input() control: DynamicFormControl;

    constructor(
        public dynamicFormService: DynamicFormService
    ) {
        super();
    }

    removeControl() {
        if (this.fg instanceof DynamicFormArray) {
            this.fg.removeAt(this.fg.controls.indexOf(this.control));
            this.dynamicFormService.removeElementReference(this.control);

        } else if (this.fg instanceof DynamicFormGroup && this.control.groupWrap) {
            let formArray = (this.fg.parent as DynamicFormArray);
            formArray.removeAt(formArray.controls.indexOf(this.fg));
        }
    }

    uploadFile(element: any) {

        let reader = new FileReader();
        if (element.files && element.files.length > 0) {
            let file = element.files[0];
            reader.readAsBinaryString(file);
            reader.onload = () => {
                this.control.setValue(reader.result);
            };
        }
    }

}
