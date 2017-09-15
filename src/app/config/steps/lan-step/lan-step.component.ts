import { Component, ViewChild } from '@angular/core';
import { FormComponent } from '../../../shared/form/form.component';
import { WizardService } from '../../wizard.service';
import { LanStepEntity } from './lan-step.entity';
import { FormStepBase } from '../form-step.base';

@Component({
    templateUrl: './lan-step.component.html',
    styleUrls: ['./lan-step.component.scss']
})
export class LanStepComponent extends FormStepBase implements FormStepBase {
    @ViewChild(FormComponent) formComponent: FormComponent;

    title = 'Lan Configuration';

    constructor(
        public lanStepentity: LanStepEntity,
        protected wizardService: WizardService
    ) {
        super(lanStepentity, wizardService);
    }
}