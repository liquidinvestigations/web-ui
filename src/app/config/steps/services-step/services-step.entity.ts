import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { SERVICES_FORM } from '../../../core/li-forms/services-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormArray } from '../../../shared/dynamic-forms/builder/dynamic-form-array';
import { DynamicFormControl } from '../../../shared/dynamic-forms/builder/dynamic-form-control';

@Injectable()
export class ServicesStepEntity extends FormStepEntity {

    public showSSHkeys = false;

    constructor(protected wizardEntity: WizardEntity) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        return new DynamicFormGroup()
            .elements([

                new DynamicFormGroup('network')
                    .elements([
                        new DynamicFormGroup('ssh')
                            .elements([
                                new DynamicFormControl('enabled', 'SSH')
                                    .setControlType(DynamicFormControl.TYPE_CHECKBOX),

                                new DynamicFormArray('authorized_keys')
                                    .generateElement(
                                        new DynamicFormControl()
                                            .setControlType(DynamicFormControl.TYPE_TEXT)
                                            .setIsRemovable()
                                    )
                                    .setIsHidden(
                                        () => this.showSSHkeys
                                    )
                                    .enableInteraction()
                                    .setMaxElements(5),

                            ])
                    ]),

                SERVICES_FORM,

            ]);
    }

}
