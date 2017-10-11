import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormValidator } from '../../../shared/dynamic-forms/validation/dynamic-form.validator';
import { DynamicFormControl } from '../../../shared/dynamic-forms/builder/dynamic-form-control';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';

import { WizardStateService } from '../../wizard-state.service';

@Injectable()
export class AdminStepEntity {

    constructor(
        private dynamicFormService: DynamicFormService,
        public wizardConfigState: WizardStateService
    ) {}

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
}
