import { Injectable } from '@angular/core';
import { Entity } from '../../../shared/entity/entity';
import { WizardEntity } from '../../wizard.entity';
import { DynamicInputModel } from '@ng-dynamic-forms/core/src/model/input/dynamic-input.model';
import { DynamicFormControlModel } from '@ng-dynamic-forms/core/src/model/dynamic-form-control.model';
import { DynamicFormGroupModel } from '@ng-dynamic-forms/core/src/model/form-group/dynamic-form-group.model';

@Injectable()
export class AdminStepEntity extends Entity {

    constructor(protected wizardEntity: WizardEntity) {
        super();
    }

    getFields(): DynamicFormControlModel[] {
        return [
            new DynamicFormGroupModel({
                id: 'network',
                group: [

                    new DynamicInputModel({
                        id: 'domain',
                        label: 'Hostname',
                        placeholder: 'Hostname'
                    }),

                    new DynamicInputModel({
                        id: 'username',
                        label: 'Username',
                        placeholder: 'Username',
                        value: 'Admin'
                    }),

                    new DynamicInputModel({
                        id: 'password',
                        label: 'Password',
                        inputType: 'password'
                    }),

                    new DynamicInputModel({
                        id: 'confirm_password',
                        label: 'Confirm password',
                        inputType: 'password'
                    }),

                ]
            })

        ];
    }

    setDefaultValues() {
        this.wizardEntity.updateFormData((data) => {
            this.getForm().setValues(data);
        });
    }


    submitAction(formValues): void {
        // these have to be managed by other endpoint
        delete formValues.network.username;
        delete formValues.network.password;
        delete formValues.network.confirm_password;

        this.wizardEntity.adjustConfig(formValues);
    }

}
