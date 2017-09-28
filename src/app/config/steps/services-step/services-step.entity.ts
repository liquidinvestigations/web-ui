import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { SERVICES_FORM } from '../../../core/li-forms/services-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormArray } from '../../../shared/dynamic-forms/builder/dynamic-form-array';
import { DynamicFormControl } from '../../../shared/dynamic-forms/builder/dynamic-form-control';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { ServicesElementRendererComponent } from './services-element-renderer.component';

@Injectable()
export class ServicesStepEntity extends FormStepEntity {

    constructor(protected wizardEntity: WizardEntity, private dynamicFormService: DynamicFormService) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicFormGroup {

        this.dynamicFormService
            .setRenderer(ServicesElementRendererComponent);

        return new DynamicFormGroup()
            .elements([

                new DynamicFormGroup('network')
                    .elements([
                        new DynamicFormGroup('ssh')
                            .setGroupCssClass('col-xs-12')
                            .elements([
                                new DynamicFormControl('enabled', 'SSH')
                                    .setFormGroupCssClass('service-group')
                                    .setControlType(DynamicFormControl.TYPE_SLIDER),

                                new DynamicFormArray('authorized_keys')
                                    .setArrayCssClass('col-xs-12 col-xs-offset-0 col-sm-9 col-sm-offset-2')
                                    .generateElement(
                                        new DynamicFormControl('key')
                                            .wrapInGroup()
                                            .setRenderer(false)
                                            .setControlType(DynamicFormControl.TYPE_TEXT)
                                            .setIsRemovable()
                                    )
                                    .setIsHidden(
                                        true
                                    )
                                    .enableInteraction()
                                    .setMaxElements(5),

                            ])
                    ]),

                SERVICES_FORM,

            ]);
    }

}
