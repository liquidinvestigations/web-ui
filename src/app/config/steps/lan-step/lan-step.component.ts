import { Component, ViewChild } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { LanStepEntity } from './lan-step.entity';
import { FormStepBase } from '../form-step.base';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';

@Component({
    templateUrl: './lan-step.component.html',
    styleUrls: ['./lan-step.component.scss']
})
export class LanStepComponent extends FormStepBase implements FormStepBase {
    @ViewChild(DynamicFormComponent) formInstance: DynamicFormComponent;

    title = 'Lan Configuration';

    constructor(
        public lanStepEntity: LanStepEntity,
        protected wizardService: WizardService
    ) {
        super(lanStepEntity, wizardService);
    }
}