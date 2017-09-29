import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { SERVICES_FORM } from '../../../shared/li-forms/services-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { ServicesElementRendererComponent } from './services-element-renderer.component';
import { SSH_FORM } from '../../../shared/li-forms/ssh-form';

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
                SSH_FORM,
                SERVICES_FORM,
            ]);
    }

}
