import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { WAN_FORM } from '../../../core/li-forms/wan-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';

@Injectable()
export class WanStepEntity extends FormStepEntity {

    constructor(protected wizardEntity: WizardEntity) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        return WAN_FORM;
    }
}
