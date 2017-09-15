import { Component, ViewChild } from '@angular/core';
import { FormStepBase } from '../form-step.base';
import { ServicesStepEntity } from './services-step.entity';
import { WizardService } from '../../wizard.service';
import { FormComponent } from '../../../shared/form/form.component';

@Component({
    templateUrl: './services-step.component.html',
    styleUrls: ['./services-step.component.css']
})
export class ServicesStepComponent extends FormStepBase implements FormStepBase {
    @ViewChild(FormComponent) formComponent: FormComponent;

    title = 'Services';

    constructor(
        public servicesStepEntity: ServicesStepEntity,
        protected wizardService: WizardService,
    ) {
        super(servicesStepEntity, wizardService);
    }


}
