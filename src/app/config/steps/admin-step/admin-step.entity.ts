import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormValidator } from '../../../shared/dynamic-forms/validation/dynamic-form.validator';
import { DynamicFormControl } from '../../../shared/dynamic-forms/builder/dynamic-form-control';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { ApiClientService } from '../../../core/api-client.service';
import { FormStepEntity } from '../form-step.entity';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { WizardConfigStateEntity } from '../../wizard-config-state.entity';

@Injectable()
export class AdminStepEntity extends FormStepEntity {

    endpoint: string = '/api/network/domain';

    constructor(
        protected apiService: ApiClientService,
        private dynamicFormService: DynamicFormService,
        public wizardConfigState: WizardConfigStateEntity
    ) {
        super(apiService, wizardConfigState);
        this.init();
        this.createOnSubmit();
    }

    getDynamicFormConfig(): DynamicFormGroup {
        this.dynamicFormService
            .setLabelCssClass('col-xs-12 col-sm-5 text-right')
            .setControlCssClass('col-xs-12 col-sm-7');

        return new DynamicFormGroup()
            .elements([
                new DynamicFormControl('domain', 'Hostname')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setPlaceholder('hostname')
                    .setDividerBottom('row')
                    .setValidators([
                        Validators.required,
                        DynamicFormValidator.hostnameValidator
                    ]),

                new DynamicFormControl('username', 'Admin username')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setPlaceholder('username')
                    .setValidators([
                        Validators.required,
                        DynamicFormValidator.regexValidator(
                            /^[a-z0-9]+$/i,
                            'Username has to be alpha-numeric'
                        )
                    ]),

                new DynamicFormControl('password', 'Password')
                    .setControlType(DynamicFormControl.TYPE_PASSWORD)
                    .setValidators([
                        Validators.required,
                        Validators.minLength(6)
                    ]),

                new DynamicFormControl('confirm_password', 'Confirm Password')
                    .setControlType(DynamicFormControl.TYPE_PASSWORD)
                    .setValidators([
                        Validators.required,
                    ]),

            ])
            .setValidators([
                DynamicFormValidator.FieldMatch(
                    'password',
                    'confirm_password',
                    'Confirmation must match the password'
                )
            ]);
    }

    createApiEntityConfig(adminSettings: {}) {
        return this.apiService
            .post('/api/registration', adminSettings);
    }

}
