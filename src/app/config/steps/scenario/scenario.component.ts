import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { StepInterface } from '../step.interface';

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit, StepInterface {

    title = 'Scenario Selection';

    constructor(private wizardService: WizardService) {
        this.wizardService.setStep(this);
    }

    ngOnInit() {
    }

}
