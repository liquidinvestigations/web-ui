import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/group/dynamic-form-group';
import { DynamicElement } from '../../../shared/dynamic-forms/elements/dynamic-element';
import { Validators } from '@angular/forms';
import { DynamicFormValidator } from '../../../shared/dynamic-forms/elements/validation/dynamic-form.validator';

@Injectable()
export class LanStepEntity extends FormStepEntity {

    constructor(protected wizardEntity: WizardEntity) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        return new DynamicFormGroup()
            .elements([
                new DynamicFormGroup('network').elements([
                    new DynamicFormGroup('lan')
                        .elements([

                            new DynamicElement('eth', 'Use LAN')
                                .setType(DynamicElement.TYPE_CHECKBOX)
                                .onChange((value, mapping, formGroup) => {
                                    let controls = formGroup.get(['network', 'lan']).controls;

                                    for (let i in controls) {
                                        if (i !== 'eth') {
                                            if (value) {
                                                controls[i].enable();
                                            } else {
                                                controls[i].disable();
                                            }
                                        }
                                    }
                                }),

                            new DynamicElement('ip', 'IP')
                                .setType(DynamicElement.TYPE_TEXT)
                                .setPlaceholder('000.000.000.000')
                                .setValidators([
                                    Validators.required,
                                    DynamicFormValidator.IpV4Validator
                                ]),

                            new DynamicElement('netmask', 'Netmask')
                                .setType(DynamicElement.TYPE_TEXT)
                                .setPlaceholder('000.000.000.000')
                                .setValidators([
                                    Validators.required,
                                    DynamicFormValidator.IpV4Validator
                                ]),

                            new DynamicElement('dhcp_range', 'DHCP Range')
                                .setType(DynamicElement.TYPE_TEXT)
                                .setPlaceholder('000.000.000.000-255')
                                .setValidators([
                                    Validators.required
                                ]),

                            new DynamicFormGroup('hotspot')
                                .elements([
                                    new DynamicElement('ssid', 'SSID')
                                        .setType(DynamicElement.TYPE_TEXT)
                                        .setPlaceholder('SSID')
                                        .setValidators([
                                            Validators.required
                                        ]),

                                    new DynamicElement('password', 'Password')
                                        .setType(DynamicElement.TYPE_PASSWORD)
                                        .setEnableTextToggle()
                                        .setValidators([
                                            Validators.required
                                        ]),
                                ])

                        ])
                ])
            ]);
    }

}
