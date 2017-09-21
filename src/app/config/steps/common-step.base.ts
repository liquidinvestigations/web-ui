import { OnInit } from '@angular/core';
import { WizardService } from '../wizard.service';

export abstract class CommonStepBase implements OnInit {

    abstract title: string;
    showProgress = true;

    buttonConfig = {
        label: 'Next',
        iconClass: 'glyphicon glyphicon-chevron-right',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.GO_NEXT);
        }
    };

    ngOnInit(): void {}

    constructor(
        protected wizardService: WizardService,
    ) {
        this.stepInit();
    }

    protected stepInit() {
        setTimeout(() => {
            this.wizardService.setStep(this);
        });

        this.wizardService.subscribe(WizardService.GO_NEXT, () => {
            this.onNext();
            this.wizardService.goNextStep();
        });

        this.wizardService.subscribe(WizardService.END_WIZARD, () => {
            this.onFinish();
        });
    }

    protected onNext() { }

    protected onFinish() { }

}
