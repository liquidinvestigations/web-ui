import { Injectable } from '@angular/core';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { ApiClientService } from '../../../core/api-client.service';
import { FormStepEntity } from '../form-step.entity';
import { LAN_FORM } from '../../../shared/li-forms/lan-form';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { WizardConfigStateEntity } from '../../wizard-config-state.entity';

@Injectable()
export class LanStepEntity extends FormStepEntity {

    endpoint: string = '/api/network/lan';

    constructor(
        protected apiService: ApiClientService,
        private dynamicFormService: DynamicFormService,
        public wizardConfigState: WizardConfigStateEntity
    ) {
        super(apiService, wizardConfigState);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        this.dynamicFormService
            .resetCssClasses()
            .setLabelCssClass('col-xs-12 col-sm-5 text-right')
            .setControlCssClass('col-xs-12 col-sm-7');

        return LAN_FORM;
    }

}
