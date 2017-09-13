import { Component } from '@angular/core';
import { CommonStepBase } from '../common-step.base';
import { WizardService } from '../../wizard.service';

@Component({
    selector: 'li-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent extends CommonStepBase implements CommonStepBase {

    title = 'Services Selection';

    constructor(
        protected wizardService: WizardService,
    ) {
        super(wizardService);
    }

}
