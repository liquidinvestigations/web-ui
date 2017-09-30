import { CommonStepBase } from './common-step.base';
import { WizardService } from '../wizard.service';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { Observable } from 'rxjs/Observable';

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

    constructor(
        public formStepEntity: any,
        protected wizardService: WizardService
    ) {
        super(wizardService);

        this.dynamicFormConfig = this.formStepEntity.getDynamicFormConfig();
        this.formStepEntity.setFormInstance(this.dynamicFormConfig);

        this.buttonDisabled = this.dynamicFormConfig.invalid && this.dynamicFormConfig.touched;

        this.dynamicFormConfig.valueChanges
            .debounceTime(100)
            .subscribe(() => {
                this.buttonDisabled = this.dynamicFormConfig.invalid;
            });

        this.wizardService.removeListeners(WizardService.GO_NEXT);

        this.wizardService.subscribe(WizardService.GO_NEXT, (formValues: any) => {
            this.buttonDisabled = true;
            this.isLoading = true;

            let nextResult: any = this.onNext(formValues);

            if (nextResult && nextResult instanceof Observable) {
                nextResult.subscribe(() => {
                    this.wizardService.goNextStep();
                    this.formStepEntity.wizardConfigState.updateConfigState(formValues);
                });
            } else if (nextResult === undefined || nextResult === true) {
                this.wizardService.goNextStep();
                this.formStepEntity.wizardConfigState.updateConfigState(formValues);
            }
        });

        this.wizardService.subscribe(WizardService.END_WIZARD, () => {
            this.onFinish();
        });
    }

    protected onNext(formValues: {}) {
        this.dynamicFormConfig.disable();
        return this.formStepEntity.updateWithFormValues(formValues);
    }

    // if passes form validation. triggers GO_NEXT event -> super
    successSubmit(formValues: {}) {
        this.wizardService.notifySubscribers(WizardService.GO_NEXT, formValues);
    }
}
