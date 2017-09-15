import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Entity } from '../entity/entity';
import { DynamicFormControlModel } from '@ng-dynamic-forms/core/src/model/dynamic-form-control.model';
import { DynamicFormService } from '@ng-dynamic-forms/core';

@Component({
    selector: 'li-form',
    templateUrl: './form.component.html',
    styleUrls: []
})
export class FormComponent implements OnInit {

    @Input() entity: Entity;
    @Input() saveAction: Function = null;

    formModel: DynamicFormControlModel[];
    formGroup: FormGroup;

    showSubmit = true;

    constructor(private formService: DynamicFormService) {}


    ngOnInit() {
        this.formModel = this.entity.fields;
        this.formGroup = this.formService.createFormGroup(this.formModel);
    }


    getValues() {
        return this.formGroup.getRawValue();
    }

    setValues(values: {}) {
        this.formGroup.patchValue(values);
    }

    onSubmit() {
        this.entity.submitAction();
    }

}
