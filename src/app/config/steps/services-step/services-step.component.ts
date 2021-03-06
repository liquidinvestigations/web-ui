import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormStepBase } from '../form-step.base';
import { ServicesStepEntity } from './services-step.entity';
import { WizardService } from '../../wizard.service';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';

@Component({
    templateUrl: './services-step.component.html',
    styleUrls: ['./services-step.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ServicesStepComponent extends FormStepBase {
    @ViewChild(DynamicFormComponent) formViewInstance: DynamicFormComponent;

    title = 'Services';

    constructor(
        public servicesStepEntity: ServicesStepEntity,
        protected wizardService: WizardService,
    ) {
        super(servicesStepEntity, wizardService);
    }

}
