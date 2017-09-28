import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { WizardEntity } from '../../wizard.entity';
import { LAN_FORM } from '../../../core/li-forms/lan-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';

@Injectable()
export class LanStepEntity extends FormStepEntity {

    constructor(protected wizardEntity: WizardEntity) {
        super(wizardEntity);
    }

    getDynamicFormConfig(): DynamicFormGroup {
        return LAN_FORM;
    }

}
