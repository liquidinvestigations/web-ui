import { OnInit } from '@angular/core';
import { WizardService } from '../wizard.service';

export abstract class CommonStepBase implements OnInit {

    abstract title: string;
    showProgress = true;
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

    onNext() { }

    onFinish() {}

}
