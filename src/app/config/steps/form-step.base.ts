import { CommonStepBase } from './common-step.base';
import { WizardService } from '../wizard.service';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';

export abstract class FormStepBase extends CommonStepBase {
    abstract formViewInstance: DynamicFormComponent;

    public dynamicFormConfig: DynamicFormGroup;

    buttonConfig = {
        label: 'Next',
        iconClass: 'glyphicon glyphicon-chevron-right',
        buttonClass: 'btn btn-primary',
        action: () => {
            // if successful will call successSubmit
            this.formViewInstance.onSubmit();
        },
        isDisabled: () => this.buttonDisabled,
        isLoading: () => this.isLoading
    };

    buttonDisabled = true;

    constructor(public formStepEntity: any,
                protected wizardService: WizardService) {
        super(wizardService);

        this.dynamicFormConfig = this.formStepEntity.getDynamicFormConfig();
        this.dynamicFormConfig
            .patchValue(
                formStepEntity.wizardConfigState.getConfigState(),
                {emitEvent: false}
            );

        this.dynamicFormConfig.enable({emitEvent: false});

        this.buttonDisabled = this.dynamicFormConfig.invalid && this.dynamicFormConfig.touched;

        this.dynamicFormConfig.valueChanges
            .debounceTime(100)
            .subscribe(() => {
                this.buttonDisabled = this.dynamicFormConfig.invalid;
            });
    }

    protected onNext(formValues: {}) {
        this.dynamicFormConfig.disable();
        if (formValues) {
            this.formStepEntity.wizardConfigState.updateConfigState(formValues);
        }
    }

    // if passes form validation. triggers GO_NEXT event -> super
    successSubmit(formValues: {}) {
        this.wizardService.notifySubscribers(WizardService.GO_NEXT, formValues);
    }
}
