import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { DynamicForm } from '../../../shared/dynamic-forms/dynamic-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/group/dynamic-form-group';
import { DynamicElement } from '../../../shared/dynamic-forms/elements/dynamic-element';

@Injectable()
export class WanStepEntity extends FormStepEntity {

    constructor(protected wizardEntity: WizardEntity) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicForm | DynamicFormGroup {
        return new DynamicForm('network')
            .elements([
                new DynamicFormGroup('wan')
                    .elements([
                        new DynamicFormGroup('static')
                            .elements([
                                new DynamicElement('ip', 'IP')
                                    .setType(DynamicElement.TYPE_TEXT)
                                    .setPlaceholder('000.000.000.000'),

                                new DynamicElement('netmask', 'Netmask')
                                    .setType(DynamicElement.TYPE_TEXT)
                                    .setPlaceholder('000.000.000.000-255'),

                                new DynamicElement('gateway', 'Gateway')
                                    .setType(DynamicElement.TYPE_TEXT)
                                    .setPlaceholder('000.000.000.000-255'),

                                new DynamicElement('dns_server', 'DNS Server')
                                    .setType(DynamicElement.TYPE_TEXT)
                                    .setPlaceholder('000.000.000.000'),

                            ]),

                        new DynamicFormGroup('wifi')
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

    submitAction(formValues): void {
        this.wizardEntity.adjustConfig(formValues);
    }

}
