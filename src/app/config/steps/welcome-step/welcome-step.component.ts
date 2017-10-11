import { Component } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { CommonStepBase } from '../common-step.base';
import { WizardStateService } from '../../wizard-state.service';

@Component({
    selector: 'li-welcome-step',
    templateUrl: './welcome-step.component.html',
    styleUrls: ['./welcome-step.component.scss']
})
export class WelcomeStepComponent extends CommonStepBase {

    title = '';

    showProgress = false;

    isLoading: boolean = true;
    buttonDisabled: boolean = true;

    buttonConfig = {
        label: 'Start',
        iconClass: 'glyphicon glyphicon-log-in',
        buttonClass: 'btn btn-success',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.GO_NEXT);
        },
        isDisabled: () => this.buttonDisabled,
        isLoading: () => this.isLoading
    };

    constructor(
        private wizardConfigState: WizardStateService,
        protected wizardService: WizardService
    ) {
        super(wizardService);

        this.wizardConfigState
            .subscribe(WizardStateService.DEVICE_CONFIG_LOADED, () => {
                this.isLoading = false;
                this.buttonDisabled = false;
            });
    }

    ngOnInit(): void {
        if (this.buttonConfig) {
            this.buttonDisabled = true;
        }
    }
}
