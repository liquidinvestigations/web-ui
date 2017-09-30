import { Component, ViewChild } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { LanStepEntity } from './lan-step.entity';
import { FormStepBase } from '../form-step.base';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';

@Component({
    templateUrl: '../form-step-base.html',
    styleUrls: ['./lan-step.component.scss']
})
export class LanStepComponent extends FormStepBase {
    @ViewChild(DynamicFormComponent) formViewInstance: DynamicFormComponent;

    title = 'Lan Configuration';

    constructor(
        public lanStepEntity: LanStepEntity,
        protected wizardService: WizardService
    ) {
        super(lanStepEntity, wizardService);
    }
}
