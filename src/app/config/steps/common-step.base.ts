import { OnInit } from '@angular/core';
import { WizardService } from '../wizard.service';

export abstract class CommonStepBase implements OnInit {

    abstract title: string;
    showProgress = true;

    buttonDisabled: boolean = false;

    buttonConfig = {
        label: 'Next',
        iconClass: 'glyphicon glyphicon-chevron-right',
        buttonClass: 'btn btn-primary',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.GO_NEXT);
        },
        isDisabled: () => this.buttonDisabled
    };


    ngOnInit(): void {
        if (this.buttonConfig) {
            this.buttonDisabled = false;
        }
    }

    constructor(
        protected wizardService: WizardService,
    ) {
        this.stepInit();
    }

    protected stepInit() {
        setTimeout(() => {
            this.wizardService.setStep(this);
        });

        this.wizardService.removeListeners(WizardService.GO_NEXT);

        this.wizardService.subscribe(WizardService.GO_NEXT, (formValues: any) => {
            this.onNext(formValues);
            this.wizardService.goNextStep();
        });

        this.wizardService.subscribe(WizardService.END_WIZARD, () => {
            this.onFinish();
        });
    }

    protected onNext(data) { }

    protected onFinish() { }

}
