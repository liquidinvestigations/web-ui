import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { StepInterface } from '../step.interface';

@Component({
    selector: 'app-network',
    templateUrl: './network.component.html',
    styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit, StepInterface {

    title = 'Network Configuration';

    constructor(private wizardService: WizardService) {
        this.wizardService.setStep(this);
    }

    ngOnInit() {
    }

}
