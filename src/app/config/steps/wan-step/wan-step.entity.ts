import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/group/dynamic-form-group';
import { DynamicElement } from '../../../shared/dynamic-forms/elements/dynamic-element';
import { Validators } from '@angular/forms';
import { DynamicFormValidator } from '../../../shared/dynamic-forms/elements/validation/dynamic-form.validator';

@Injectable()
export class WanStepEntity extends FormStepEntity {

    constructor(protected wizardEntity: WizardEntity) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        return new DynamicFormGroup()
            .elements([
                new DynamicFormGroup('network')
                    .elements([
                        new DynamicFormGroup('wan')
                            .elements([
                                new DynamicFormGroup('static')
                                    .elements([
                                        new DynamicElement('ip', 'IP')
                                            .setType(DynamicElement.TYPE_TEXT)
                                            .setPlaceholder('000.000.000.000')
                                            .setValidators([
                                                Validators.required,
                                                DynamicFormValidator.IpV4Validator
                                            ])
                                            .setHasBottomDivider(),

                                        new DynamicElement('netmask', 'Netmask')
                                            .setType(DynamicElement.TYPE_TEXT)
                                            .setPlaceholder('000.000.000.000')
                                            .setValidators([
                                                Validators.required,
                                                DynamicFormValidator.IpV4Validator
                                            ]),

                                        new DynamicElement('gateway', 'Gateway')
                                            .setType(DynamicElement.TYPE_TEXT)
                                            .setPlaceholder('000.000.000.000')
                                            .setValidators([
                                                Validators.required,
                                                DynamicFormValidator.IpV4Validator
                                            ]),

                                        new DynamicElement('dns_server', 'DNS Server')
                                            .setType(DynamicElement.TYPE_TEXT)
                                            .setPlaceholder('000.000.000.000')
                                            .setValidators([
                                                Validators.required,
                                                DynamicFormValidator.IpV4Validator
                                            ]),

                                    ]),

                                new DynamicFormGroup('wifi')
                                    .elements([
                                        new DynamicElement('ssid', 'SSID')
                                            .setType(DynamicElement.TYPE_TEXT)
                                            .setPlaceholder('your SSID')
                                            .setValidators([
                                                Validators.required,
                                            ]),

                                        new DynamicElement('password', 'Password')
                                            .setType(DynamicElement.TYPE_PASSWORD)
                                            .setEnableTextToggle()
                                            .setValidators([
                                                Validators.required,
                                            ]),
                                    ])
                            ])
                    ])

            ]);
    }
}
