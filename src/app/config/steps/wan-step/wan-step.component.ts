import { Component, ViewChild } from '@angular/core';
import { FormComponent } from '../../../shared/form/form.component';
import { WizardService } from '../../wizard.service';
import { WanStepEntity } from './wan-step.entity';
import { FormStepBase } from '../form-step.base';

@Component({
    templateUrl: './wan-step.component.html',
    styleUrls: ['./wan-step.component.scss']
})
export class WanStepComponent extends FormStepBase implements FormStepBase {
    @ViewChild(FormComponent) formComponent: FormComponent;

    title = 'Wan Configuration';

    constructor(
        public wanStepentity: WanStepEntity,
        protected wizardService: WizardService
    ) {
        super(wanStepentity, wizardService);
    }
}