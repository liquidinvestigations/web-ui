import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { WAN_FORM } from '../../../core/li-forms/wan-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';

@Injectable()
export class WanStepEntity extends FormStepEntity {

    constructor(protected wizardEntity: WizardEntity, private dynamicFormService: DynamicFormService) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        this.dynamicFormService
            .setLabelCssClass('col-xs-12 col-sm-5 text-right')
            .setControlCssClass('col-xs-12 col-sm-7');

        return WAN_FORM;
    }
}
