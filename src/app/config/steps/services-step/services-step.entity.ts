import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/group/dynamic-form-group';
import { DynamicElement } from '../../../shared/dynamic-forms/elements/dynamic-element';
import { ServicesElementRendererComponent } from './services-element-renderer.component';
import { DynamicFormArray } from '../../../shared/dynamic-forms/group/dynamic-form-array';

@Injectable()
export class ServicesStepEntity extends FormStepEntity {

    public showSSHkeys = false;

    constructor(protected wizardEntity: WizardEntity) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        return new DynamicFormGroup()
            .setControlsRenderer(ServicesElementRendererComponent)
            .elements([

                new DynamicFormGroup('network')
                    .elements([
                        new DynamicFormGroup('ssh')
                            .elements([
                                new DynamicElement('enabled', 'SSH')
                                    .setType(DynamicElement.TYPE_CHECKBOX),

                                new DynamicFormArray('authorized_keys')
                                    .setVisibility(
                                        () => this.showSSHkeys
                                    )
                                    .generateElement(
                                        new DynamicElement('key')
                                            .setRenderer(false)
                                            .setType(DynamicElement.TYPE_TEXT)
                                            .setIsRemovable()
                                    )
                                    .setMaxAddLimit(5)
                            ])
                    ]),

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

            ]);
    }

}
