import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { CommonStepBase } from '../common-step.base';

@Component({
    selector: 'li-welcome-step',
    templateUrl: './welcome-step.component.html',
    styleUrls: ['./welcome-step.component.scss']
})
export class WelcomeStepComponent extends CommonStepBase implements CommonStepBase {

    title = '';

    showProgress = false;

    buttonConfig = {
        label: 'Start',
        iconClass: 'glyphicon glyphicon-log-in',
        buttonClass: 'btn btn-success',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.GO_NEXT);
        }
    };

    constructor(protected wizardService: WizardService) {
        super(wizardService);
    }

}
