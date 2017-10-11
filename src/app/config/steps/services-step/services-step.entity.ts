import { Injectable } from '@angular/core';
import { SERVICES_FORM } from '../../../shared/li-forms/services-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { ServicesElementRendererComponent } from './services-element-renderer.component';
import { SSH_FORM } from '../../../shared/li-forms/ssh-form';
import { WizardStateService } from '../../wizard-state.service';

@Injectable()
export class ServicesStepEntity {

    constructor(private dynamicFormService: DynamicFormService,
                public wizardConfigState: WizardStateService) {
    }

    getDynamicFormConfig(): DynamicFormGroup {
        let currentConfig = this.wizardConfigState.getConfigState();

        this.dynamicFormService
            .setRenderer(ServicesElementRendererComponent);

        return new DynamicFormGroup()
            .elements([
                SERVICES_FORM(currentConfig['services']),
            ]);
    }

}
