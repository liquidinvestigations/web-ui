import {
    AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';
import { DynamicFormGroup } from './group/dynamic-form-group';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `.form-group { margin-bottom: 10px; }`
    ]
})
export class DynamicFormComponent implements OnInit, AfterViewInit {
    @Input() dynamicFormGroupConfig: DynamicFormGroup;

    fg: FormGroup;

    constructor(
        private dynamicFormService: DynamicFormService,
    ) {
        this.dynamicFormService.fieldsMapping = [];
        this.dynamicFormService.arrayFields = [];

        let fb = new FormBuilder();
        this.fg = fb.group({});

        this.dynamicFormService.manageForm(this.fg);
    }

    getValues() {
        return this.dynamicFormService.flattenArrays(
            this.fg.getRawValue()
        );
    }

    setValues(value: {}) {
        this.fg.patchValue(value);
    }

    getFieldsMapping() {
        return this.dynamicFormService.fieldsMapping;
    }

    ngOnInit() {
        if (this.dynamicFormGroupConfig.renderer) {
            this.dynamicFormService.addFormRenderer(this.dynamicFormGroupConfig.renderer);
        }

        this.fg.markAsTouched();
    }

    ngAfterViewInit() {
    }

}
