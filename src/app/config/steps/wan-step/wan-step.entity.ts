import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { ApiClientService } from '../../../core/api-client.service';
import { WAN_FORM } from '../../../shared/li-forms/wan-form';
import { WizardConfigStateEntity } from '../../wizard-config-state.entity';

@Injectable()
export class WanStepEntity extends FormStepEntity {

    endpoint: string = '/api/network/wan';

    constructor(
        protected apiService: ApiClientService,
        private dynamicFormService: DynamicFormService,
        public wizardConfigState: WizardConfigStateEntity
    ) {
        super(apiService, wizardConfigState);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        this.dynamicFormService
            .setLabelCssClass('col-xs-12 col-sm-5 text-right')
            .setControlCssClass('col-xs-12 col-sm-7');

        return WAN_FORM;
    }
}
