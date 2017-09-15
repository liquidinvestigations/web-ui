import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { CommonStepBase } from '../common-step.base';

@Component({
    selector: 'li-welcome-step',
    templateUrl: './welcome-step.component.html',
    styleUrls: ['./welcome-step.component.css']
})
export class WelcomeStepComponent extends CommonStepBase implements CommonStepBase {


    title = 'Liquid Investigation - Instalation';

    showProgress = false;

    constructor(protected wizardService: WizardService) {
        super(wizardService);
    }

    onControlsClick(direction: string) {
        super.onControlsClick(direction);
    }

}
