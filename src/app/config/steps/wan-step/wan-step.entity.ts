import { Injectable } from '@angular/core';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { WAN_FORM } from '../../../shared/li-forms/wan-form';
import { WizardStateService } from '../../wizard-state.service';

@Injectable()
export class WanStepEntity {

    constructor(
        private dynamicFormService: DynamicFormService,
        public wizardConfigState: WizardStateService
    ) {
    }

    getDynamicFormConfig(): DynamicFormGroup {
        this.dynamicFormService
            .setLabelCssClass('col-xs-12 col-sm-5 text-right')
            .setControlCssClass('col-xs-12 col-sm-7');

        return WAN_FORM;
    }
}
