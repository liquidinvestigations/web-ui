import { CommonStepBase } from './common-step.base';
import { WizardService } from '../wizard.service';
import { FormStepEntity } from './form-step.entity';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';
import { AfterViewInit } from '@angular/core';

export abstract class FormStepBase extends CommonStepBase implements CommonStepBase, AfterViewInit {
    abstract formInstance: DynamicFormComponent;

    constructor(
        public formStepEntity: FormStepEntity,
        protected wizardService: WizardService
    ) {
        super(wizardService);
    }

    ngOnInit() {
        this.formStepEntity.setFormInstance(this.formInstance);
    }

    ngAfterViewInit() {
        this.formStepEntity.updateValuesFromConfig();
    }

    protected onNext() {
        this.formStepEntity.onNext(this.formInstance.getValues());
    }
}
