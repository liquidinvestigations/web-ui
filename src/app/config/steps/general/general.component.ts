import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { StepInterface } from '../step.interface';

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, StepInterface {

    title = 'General Configuration';

    constructor(private wizardService: WizardService) {
        this.wizardService.setStep(this);
    }

    ngOnInit() {
    }

}
