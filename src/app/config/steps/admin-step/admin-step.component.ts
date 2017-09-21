import { Component, ViewChild } from '@angular/core';
import { FormStepBase } from '../form-step.base';
import { WizardService } from '../../wizard.service';
import { AdminStepEntity } from './admin-step.entity';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';

@Component({
    templateUrl: './admin-step.component.html',
    styleUrls: ['./admin-step.component.scss']
})
export class AdminStepComponent extends FormStepBase implements FormStepBase {
    @ViewChild(DynamicFormComponent) formInstance: DynamicFormComponent;

    title = 'Admin Configuration';

    constructor(
        public adminStepEntity: AdminStepEntity,
        protected wizardService: WizardService
    ) {
        super(adminStepEntity, wizardService);
    }
}
