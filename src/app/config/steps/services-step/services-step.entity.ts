import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { ApiClientService } from '../../../core/api-client.service';
import { DynamicForm } from '../../../shared/dynamic-forms/dynamic-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/group/dynamic-form-group';
import { DynamicElement } from '../../../shared/dynamic-forms/elements/dynamic-element';

@Injectable()
export class ServicesStepEntity extends FormStepEntity {

    constructor(
        protected wizardEntity: WizardEntity
    ) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicForm | DynamicFormGroup {
        return new DynamicFormGroup()
            .elements([
                new DynamicFormGroup('services')
                    .elements([
                        new DynamicElement('hoover', 'Hoover')
                            .setType(DynamicElement.TYPE_CHECKBOX),

                        new DynamicElement('hypothesis', 'Hypothesis')
                            .setType(DynamicElement.TYPE_CHECKBOX),

                        new DynamicElement('docuwiki', 'DocuWiki')
                            .setType(DynamicElement.TYPE_CHECKBOX),

                        new DynamicElement('matrix', 'Matrix')
                            .setType(DynamicElement.TYPE_CHECKBOX),

                        new DynamicElement('davros', 'Davros')
                            .setType(DynamicElement.TYPE_CHECKBOX),
                    ]),

                new DynamicFormGroup('network')
                    .elements([
                        new DynamicFormGroup('ssh')
                            .elements([
                                new DynamicElement('enabled', 'SSH')
                                    .setType(DynamicElement.TYPE_CHECKBOX)
                            ])
                    ])
            ]);
    }

}
