import { Component, ViewChild } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { WanStepEntity } from './wan-step.entity';
import { FormStepBase } from '../form-step.base';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';

@Component({
    templateUrl: '../form-step-base.html',
    styleUrls: ['./wan-step.component.scss']
})
export class WanStepComponent extends FormStepBase implements FormStepBase {
    @ViewChild(DynamicFormComponent) formInstance: DynamicFormComponent;

    title = 'Wan Configuration';

    constructor(
        public wanStepentity: WanStepEntity,
        protected wizardService: WizardService
    ) {
        super(wanStepentity, wizardService);
    }
}