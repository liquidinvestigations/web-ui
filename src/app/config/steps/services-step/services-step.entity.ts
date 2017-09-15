import { Injectable } from '@angular/core';
import { Entity } from '../../../shared/entity/entity';
import { WizardEntity } from '../../wizard.entity';
import { DynamicFormControlModel } from '@ng-dynamic-forms/core/src/model/dynamic-form-control.model';
import { DynamicCheckboxModel } from '@ng-dynamic-forms/core/src/model/checkbox/dynamic-checkbox.model';
import { DynamicCheckboxGroupModel } from '@ng-dynamic-forms/core/src/model/checkbox/dynamic-checkbox-group.model';
import { ApiClientService } from '../../../core/api-client.service';
import { DynamicFormGroupModel } from '@ng-dynamic-forms/core/src/model/form-group/dynamic-form-group.model';
import { DynamicFormArrayModel } from '@ng-dynamic-forms/core/src/model/form-array/dynamic-form-array.model';
import { DynamicInputModel } from '@ng-dynamic-forms/core/src/model/input/dynamic-input.model';

@Injectable()
export class ServicesStepEntity extends Entity {

    public endpoint = '/services';

    constructor(public apiClient: ApiClientService,
                protected wizardEntity: WizardEntity) {
        super();

        apiClient.get(this);

        /**
         * @TODO maybe change the response format to better fit the dynamic forms structure
         */
        apiClient.subscribe(ApiClientService.EV_GET_SUCCESSFUL, (data: any) => {
            let servicesConfig = {};

            for (let service of data) {
                servicesConfig[service.name] = service.status === 'enabled';
            }

            this.getForm().setValues({
                services: servicesConfig
            });

        });
    }

    getFields(): DynamicFormControlModel[] {
        return [

            new DynamicCheckboxGroupModel({
                id: 'services',
                group: [
                    new DynamicCheckboxModel({
                        id: 'hoover',
                        label: 'Hoover'
                    }),

                    new DynamicCheckboxModel({
                        id: 'hypothesis',
                        label: 'Hypothesis'
                    }),

                    new DynamicCheckboxModel({
                        id: 'docuwiki',
                        label: 'DocuWiki'
                    }),

                    new DynamicCheckboxModel({
                        id: 'matrix',
                        label: 'Matrix'
                    }),

                    new DynamicCheckboxModel({
                        id: 'davros',
                        label: 'Davros',
                    }),

                ]
            }),

            new DynamicFormGroupModel({
                id: 'network',
                group: [
                    new DynamicFormGroupModel({
                        id: 'ssh',
                        group: [
                            new DynamicCheckboxModel({
                                id: 'enabled',
                                label: 'SSH'
                            }),

                            new DynamicFormArrayModel({
                                id: 'authorized_keys',
                                initialCount: 3,
                                groupFactory: () => {
                                    return [
                                        new DynamicInputModel({
                                            id: 'key',
                                            label: 'Key'
                                        })
                                    ];
                                }
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
        // the services have to be managed by other endpoint
        delete formValues.services;

        // find some better way to get direct keys
        formValues.network.ssh.authorized_keys = formValues.network.ssh.authorized_keys.map((entry) => entry.key);

        this.wizardEntity.adjustConfig(formValues);
    }

}
