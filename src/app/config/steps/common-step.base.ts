import { OnInit } from '@angular/core';
import { WizardService } from '../wizard.service';

export abstract class CommonStepBase implements OnInit {

    abstract title: string;
    showProgress = true;
    ngOnInit(): void {}

    constructor(
        protected wizardService: WizardService,
    ) {
        setTimeout(() => {
            this.wizardService.setStep(this);
        });

        this.wizardService.controlsObservable.subscribe(
            this.onControlsClick.bind(this)
        );
    }

    onControlsClick(direction: string) {
        switch (direction) {

            case WizardService.IS_NEXT:
                    this.wizardService.goNextStep();
                break;

            case WizardService.IS_PREV:
                    this.wizardService.goPreviousStep();
                break;
        }
    }
}
