import { Injectable } from '@angular/core';
import { Entity } from '../../../shared/entity/entity';
import { WizardEntity } from '../../wizard.entity';
import { DynamicInputModel } from '@ng-dynamic-forms/core/src/model/input/dynamic-input.model';
import { DynamicFormControlModel } from '@ng-dynamic-forms/core/src/model/dynamic-form-control.model';
import { DynamicFormGroupModel } from '@ng-dynamic-forms/core/src/model/form-group/dynamic-form-group.model';
import { DynamicCheckboxModel } from '@ng-dynamic-forms/core/src/model/checkbox/dynamic-checkbox.model';

@Injectable()
export class LanStepEntity extends Entity {

    constructor(protected wizardEntity: WizardEntity) {
        super();
    }

    getFields(): DynamicFormControlModel[] {
        return [
            new DynamicFormGroupModel({
                id: 'network',
                group: [
                    new DynamicFormGroupModel({
                        id: 'lan',
                        group: [
                            new DynamicInputModel({
                                id: 'ip',
                                label: 'IP',
                                placeholder: '000.000.000'
                            }),

                            new DynamicInputModel({
                                id: 'netmask',
                                label: 'Netmask',
                                placeholder: '000.000.000-255'
                            }),

                            new DynamicInputModel({
                                id: 'dhcp_range',
                                label: 'DHCP Range',
                                placeholder: '000.000.000-255'
                            }),

                            new DynamicFormGroupModel({
                                id: 'hotspot',
                                group: [
                                    new DynamicInputModel({
                                        id: 'ssid',
                                        label: 'SSID',
                                        placeholder: 'SSID'
                                    }),
                                    new DynamicInputModel({
                                        id: 'password',
                                        label: 'Password',
                                        placeholder: ''
                                    }),
                                ]
                            }),

                            new DynamicCheckboxModel({
                                id: 'eth',
                                label: 'Use LAN'
                            })
                        ]
                    })
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
        this.wizardEntity.adjustConfig(formValues);
    }

}
