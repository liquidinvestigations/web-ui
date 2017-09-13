import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ElementBase } from '../elements/definitions/element.base';
import { Entity } from '../../entity/entity';

@Component({
    selector: 'li-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    @Input() entity: Entity;
    @Input() saveAction: Function = null;

    form: FormGroup;
    elements: ElementBase<any>[] = [];

    showSubmit = true;

    constructor() {
    }

    ngOnInit() {
        this.makeFormGroup();

        // check if the submit is custom handled
        if (this.entity.submitAction instanceof Function) {
            this.showSubmit = false;
        }
    }

    getFields() {
        return this.entity.fields.slice();
    }

    makeFormGroup() {
        let group: any = {};

        for (let element of this.getFields()) {
            let formConfig = element.getFormConfig();

            if (formConfig) {
                formConfig.key = element.name;
                formConfig.label = element.label;

                this.elements.push(formConfig);

                group[element.name] = formConfig.required
                    ? new FormControl(formConfig.value || '', Validators.required)
                    : new FormControl(formConfig.value || '');
            }
        }

        this.form = new FormGroup(group);
    }


    getValues() {
        return this.form.getRawValue();
    }

    setValues(values: {}) {
        this.form.setValue(values);
    }

    onSubmit() {
        this.entity.submitAction();
    }

}
