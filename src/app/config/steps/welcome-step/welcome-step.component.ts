import { Component } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { CommonStepBase } from '../common-step.base';

@Component({
    selector: 'li-welcome-step',
    templateUrl: './welcome-step.component.html',
    styleUrls: ['./welcome-step.component.scss']
})
export class WelcomeStepComponent extends CommonStepBase {

    title = '';

    showProgress = false;

    buttonConfig = {
        label: 'Start',
        iconClass: 'glyphicon glyphicon-log-in',
        buttonClass: 'btn btn-success',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.GO_NEXT);
        },
        isDisabled: () => this.buttonDisabled,
        isLoading: () => false
    };


    constructor(protected wizardService: WizardService) {
        super(wizardService);
    }
}
