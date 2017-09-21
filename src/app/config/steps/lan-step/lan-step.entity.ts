import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { DynamicForm } from '../../../shared/dynamic-forms/dynamic-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/group/dynamic-form-group';
import { DynamicElement } from '../../../shared/dynamic-forms/elements/dynamic-element';

@Injectable()
export class LanStepEntity extends FormStepEntity {

    constructor(protected wizardEntity: WizardEntity) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicForm | DynamicFormGroup {
        return new DynamicForm('network')
            .elements([
                new DynamicFormGroup('lan')
                    .elements([

                        new DynamicElement('eth', 'Use LAN')
                            .setType(DynamicElement.TYPE_CHECKBOX),

                        new DynamicElement('ip', 'IP')
                            .setType(DynamicElement.TYPE_TEXT)
                            .setPlaceholder('000.000.000.000'),

                        new DynamicElement('netmask', 'Netmask')
                            .setType(DynamicElement.TYPE_TEXT)
                            .setPlaceholder('000.000.000.000-255'),

                        new DynamicElement('dhcp_range', 'DHCP Range')
                            .setType(DynamicElement.TYPE_TEXT)
                            .setPlaceholder('000.000.000.000-255'),

                        new DynamicFormGroup('hotspot')
                            .elements([
                                new DynamicElement('ssid', 'SSID')
                                    .setType(DynamicElement.TYPE_TEXT)
                                    .setPlaceholder('your SSID'),

                                new DynamicElement('password', 'Password')
                                    .setType(DynamicElement.TYPE_PASSWORD)
                            ])

                    ])
            ]);
    }

}
