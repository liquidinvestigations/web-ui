import { OnInit } from '@angular/core';
import { WizardService } from '../wizard.service';

export abstract class CommonStepBase implements OnInit {

    abstract title: string;
    showProgress = true;

    buttonDisabled: boolean = false;
    isLoading: boolean = false;

    buttonConfig = {
        label: 'Next',
        iconClass: 'glyphicon glyphicon-chevron-right',
        buttonClass: 'btn btn-primary',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.GO_NEXT);
        },
        isDisabled: () => this.buttonDisabled,
        isLoading: () => this.isLoading
    };


    ngOnInit(): void {
        if (this.buttonConfig) {
            this.buttonDisabled = false;
        }
    }

    constructor(
        protected wizardService: WizardService,
    ) {
        setTimeout(() => {
            this.wizardService.setStep(this);
        });

        this.wizardService.removeListeners(WizardService.GO_NEXT);

        this.wizardService.subscribe(WizardService.GO_NEXT, () => {
            this.buttonDisabled = true;

            let nextResult = this.onNext();

            if (nextResult === undefined || nextResult) {
                this.wizardService.goNextStep();
            }
        });

        this.wizardService.subscribe(WizardService.END_WIZARD, () => {
            this.onFinish();
        });
    }

    // in case of FormValues this can be overridden
    protected onNext(formValues?: {}) { }

    protected onFinish() { }

}
