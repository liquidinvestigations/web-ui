import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { StepInterface } from '../step.interface';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, StepInterface {

    title = 'Services Selection';

    constructor(private wizardService: WizardService) {
        this.wizardService.setStep(this);
    }

    ngOnInit() {
    }

}
