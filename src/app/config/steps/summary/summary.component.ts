import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { StepInterface } from '../step.interface';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, StepInterface {

    title = 'Summary';

    constructor(private wizardService: WizardService) {
        this.wizardService.setStep(this);
    }

    ngOnInit() {
    }

}
