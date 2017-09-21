import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { CommonStepBase } from '../common-step.base';

@Component({
    selector: 'li-welcome-step',
    templateUrl: './welcome-step.component.html',
    styleUrls: ['./welcome-step.component.scss']
})
export class WelcomeStepComponent extends CommonStepBase implements CommonStepBase {

    title = 'Liquid Investigation - Instalation';

    showProgress = false;

    buttonConfig = {
        label: 'Begin',
        iconClass: 'glyphicon glyphicon-ok',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.GO_NEXT);
        }
    };

    constructor(protected wizardService: WizardService) {
        super(wizardService);
    }

}
