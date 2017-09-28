import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { LAN_FORM } from '../../../core/li-forms/lan-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';

@Injectable()
export class LanStepEntity extends FormStepEntity {

    constructor(protected wizardEntity: WizardEntity, private dynamicFormService: DynamicFormService) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        this.dynamicFormService
            .setLabelCssClass('col-xs-12 col-sm-5 text-right')
            .setControlCssClass('col-xs-12 col-sm-7');

        return LAN_FORM;
    }

}
