import {
    AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild,
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
export class DynamicFormComponent implements OnInit {
    @Input() dynamicFormGroupConfig: DynamicFormGroup;
    @Output() elementEvent: EventEmitter<any> = new EventEmitter();

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

    emitEvent($event) {
        this.elementEvent.emit($event);
    }
}
