import { CommonStepBase } from './common-step.base';
import { WizardService } from '../wizard.service';
import { FormStepEntity } from './form-step.entity';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';
import { AfterViewInit } from '@angular/core';

export abstract class FormStepBase extends CommonStepBase implements CommonStepBase, AfterViewInit {
    abstract formInstance: DynamicFormComponent;

    constructor(public stepEntity: FormStepEntity,
                protected wizardService: WizardService) {
        super(wizardService);
    }

    ngOnInit() {
        this.stepEntity.setFormInstance(this.formInstance);
    }

    ngAfterViewInit() {
        this.stepEntity.setDefaultValues();
    }

    onNext() {
        this.stepEntity.submitAction(this.formInstance.getValues());
    }
}
