import { WizardService } from '../wizard.service';
import { OnInit } from '@angular/core';

export abstract class CommonStepBase implements OnInit {

    abstract title: string;

    constructor(
        protected wizardService: WizardService,
    ) {
        this.wizardService.setStep(this);
        this.wizardService.controlsObservable.subscribe(
            this.onControlsClick.bind(this)
        );
    }

    ngOnInit(): void {
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
