import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { DynamicFormGroup } from './builder/dynamic-form-group';
import { DynamicFormService } from './dynamic-form.service';
import { DynamicFormControl } from './builder/dynamic-form-control';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
    @Input() fg: DynamicFormGroup;
    @Input() onSuccessSubmit: Function = null;
    @Input() showSubmitButton: boolean = true;

    constructor(public dynamicFormService: DynamicFormService, public cdRef: ChangeDetectorRef) {
    }


    onSubmit() {
        let controls = this.dynamicFormService.getElementsRefference();
        for (let i in controls) {
            if (controls[i] instanceof DynamicFormControl) {
                controls[i].markAsTouched();
            }
        }

        this.cdRef.detectChanges();

        if (this.fg.valid && this.onSuccessSubmit instanceof Function) {
            this.onSuccessSubmit(
                this.fg.getRawValue()
            );
        }
    }

    getValues() {
        return this.fg.getRawValue();
    }

    setValues(formValues: {}) {
        this.fg.patchValue(formValues);
    }
}
