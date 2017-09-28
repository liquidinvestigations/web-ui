import { CommonStepBase } from './common-step.base';
import { WizardService } from '../wizard.service';
import { FormStepEntity } from './form-step.entity';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';
import { AfterViewInit } from '@angular/core';

export abstract class FormStepBase extends CommonStepBase implements CommonStepBase, AfterViewInit {
    abstract formInstance: DynamicFormComponent;

    buttonConfig = {
        label: 'Next',
        iconClass: 'glyphicon glyphicon-chevron-right',
        buttonClass: 'btn btn-primary',
        action: () => {
            this.formInstance.onSubmit();
        },
        isDisabled: () => this.buttonDisabled
    };

    constructor(public formStepEntity: FormStepEntity,
                protected wizardService: WizardService) {
        super(wizardService);
    }

    ngOnInit() {
        this.buttonDisabled = true;
        this.formStepEntity.setFormInstance(this.formInstance);
    }

    ngAfterViewInit() {
        this.formStepEntity.updateValuesFromConfig();

        this.buttonDisabled = this.formInstance.fg.invalid && this.formInstance.fg.touched;

        this.formInstance.fg.valueChanges
            .subscribe(() => {
                this.buttonDisabled = this.formInstance.fg.invalid;
            });
    }

    protected onNext(formValues: {}) {
        this.formStepEntity.updateConfigValues(formValues);
    }

    // we need to define the success submit as arrow function to keep the current context
    successSubmit = (formValues: {}) => {
        this.wizardService.notifySubscribers(WizardService.GO_NEXT, formValues);
    }
}
