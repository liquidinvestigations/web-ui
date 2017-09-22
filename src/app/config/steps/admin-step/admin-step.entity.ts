import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/group/dynamic-form-group';
import { DynamicElement } from '../../../shared/dynamic-forms/elements/dynamic-element';
import { Validators } from '@angular/forms';
import { DynamicFormValidator } from '../../../shared/dynamic-forms/elements/validation/dynamic-form.validator';

@Injectable()
export class AdminStepEntity extends FormStepEntity {

    constructor(protected wizardEntity: WizardEntity) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        return new DynamicFormGroup()
            .elements([
                new DynamicFormGroup('network')
                    .elements([
                        new DynamicElement('domain', 'Hostname')
                            .setType(DynamicElement.TYPE_TEXT)
                            .setPlaceholder('hostname')
                            .setHasBottomDivider()
                            .setValidators([
                                Validators.required,
                                DynamicFormValidator.hostnameValidator
                            ]),
                    ]),

                new DynamicFormGroup('admin')
                    .setValidator(
                        DynamicFormValidator.FieldMatch(
                            'password',
                            'confirm_password',
                            'Confirmation must match the password'
                        )
                    )
                    .elements([
                        new DynamicElement('username', 'Admin username')
                            .setType(DynamicElement.TYPE_TEXT)
                            .setPlaceholder('username')
                            .setValidators([
                                Validators.required,
                                DynamicFormValidator.regexValidator(
                                    /^[a-z0-9]+$/i,
                                    'Username has to be alpha-numeric'
                                )
                            ]),


                        new DynamicElement('password', 'Password')
                            .setType(DynamicElement.TYPE_PASSWORD)
                            .setValidators([
                                Validators.required,
                                Validators.minLength(6)
                            ]),


                        new DynamicElement('confirm_password', 'Confirm Password')
                            .setType(DynamicElement.TYPE_PASSWORD)
                            .setValidators([
                                Validators.required,
                            ]),

                    ]),
            ]);
    }

}
