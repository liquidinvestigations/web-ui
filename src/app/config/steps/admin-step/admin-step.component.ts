import { Component, ViewChild } from '@angular/core';
import { FormComponent } from '../../../shared/form/form.component';
import { FormStepBase } from '../form-step.base';
import { WizardService } from '../../wizard.service';
import { AdminStepEntity } from './admin-step.entity';

@Component({
  templateUrl: './admin-step.component.html',
  styleUrls: ['./admin-step.component.scss']
})
export class AdminStepComponent extends FormStepBase implements FormStepBase {
    @ViewChild(FormComponent) formComponent: FormComponent;

    title = 'Admin Configuration';

    constructor(
        public adminStepEntity: AdminStepEntity,
        protected wizardService: WizardService
    ) {
        super(adminStepEntity, wizardService);
    }
}
