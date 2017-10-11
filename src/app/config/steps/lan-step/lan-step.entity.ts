import { Injectable } from '@angular/core';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { LAN_FORM } from '../../../shared/li-forms/lan-form';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { WizardStateService } from '../../wizard-state.service';

@Injectable()
export class LanStepEntity {

    constructor(
        private dynamicFormService: DynamicFormService,
        public wizardConfigState: WizardStateService
    ) {}

    getDynamicFormConfig(): DynamicFormGroup {
        this.dynamicFormService
            .setLabelCssClass('col-xs-12 col-sm-5 text-right')
            .setControlCssClass('col-xs-12 col-sm-7');

        return LAN_FORM;
    }

}
