import { Injectable } from '@angular/core';
import { Entity } from '../../../shared/entity/entity';
import { WizardEntity } from '../../wizard.entity';
import { DynamicInputModel } from '@ng-dynamic-forms/core/src/model/input/dynamic-input.model';
import { DynamicFormControlModel } from '@ng-dynamic-forms/core/src/model/dynamic-form-control.model';
import { DynamicFormGroupModel } from '@ng-dynamic-forms/core/src/model/form-group/dynamic-form-group.model';

@Injectable()
export class WanStepEntity extends Entity {

    constructor(protected wizardEntity: WizardEntity) {
        super();
    }

    getFields(): DynamicFormControlModel[] {
        return [
            new DynamicFormGroupModel({
                id: 'network',
                group: [
                    new DynamicFormGroupModel({
                        id: 'wan',
                        group: [
                            new DynamicFormGroupModel({
                                id: 'static',
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
                                        id: 'gateway',
                                        label: 'Gateway',
                                        placeholder: '000.000.000'
                                    }),

                                    new DynamicInputModel({
                                        id: 'dns_server',
                                        label: 'DNS Server',
                                        placeholder: '000.000.000'
                                    }),
                                ]
                            }),

                            new DynamicFormGroupModel({
                                id: 'wifi',
                                group: [
                                    new DynamicInputModel({
                                        id: 'ssid',
                                        label: 'SSID',
                                        placeholder: 'SSID'
                                    }),

                                    new DynamicInputModel({
                                        id: 'password',
                                        label: 'Password',
                                    }),
                                ]
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
