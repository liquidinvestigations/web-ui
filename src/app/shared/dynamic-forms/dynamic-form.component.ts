import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicForm } from './dynamic-form';
import { DynamicFormService } from './dynamic-form.service';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, AfterViewInit {
    @Input() dynamicForm: DynamicForm;


    formGroup: FormGroup;

    constructor(
        private dynamicFormService: DynamicFormService,
    ) {
        let fb = new FormBuilder();
        this.formGroup = fb.group({});

        this.dynamicFormService.manageForm(this.formGroup);
    }

    getValues() {
        return this.formGroup.getRawValue();
    }

    setValues(value: {}) {
        this.formGroup.patchValue(value);
    }

    getFieldsMapping() {
        return this.dynamicFormService.fieldsMapping;
    }

    ngOnInit() {
        if (this.dynamicForm.renderer) {
            this.dynamicFormService.addFormRenderer(this.dynamicForm.renderer);
        }
    }

    ngAfterViewInit() {
    }

}
