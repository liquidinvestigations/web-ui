import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/group/dynamic-form-group';
import { DynamicElement } from '../../../shared/dynamic-forms/elements/dynamic-element';

@Injectable()
export class AdminStepEntity extends FormStepEntity {

    constructor(protected wizardEntity: WizardEntity) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        return new DynamicFormGroup()
            .elements([

                new DynamicFormGroup('network')
                    .elements([
                        new DynamicElement('domain')
                            .setType(DynamicElement.TYPE_TEXT)
                            .setLabel('Hostname')
                            .setPlaceholder('hostname')
                            .setHasBottomDivider(),
                    ]),

                new DynamicFormGroup('admin')
                    .elements([
                        new DynamicElement('username')
                            .setType(DynamicElement.TYPE_PASSWORD)
                            .setLabel('Admin username')
                            .setPlaceholder('username'),

                        new DynamicElement('password')
                            .setType(DynamicElement.TYPE_PASSWORD)
                            .setLabel('Password'),

                        new DynamicElement('confirm_password')
                            .setType(DynamicElement.TYPE_PASSWORD)
                            .setLabel('Confirm Password'),
                    ]),
            ]);
    }

    submitAction(formValues): void {
        this.wizardEntity.adjustConfig(formValues);
    }

}
