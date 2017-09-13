import { Component } from '@angular/core';
import { CommonStepBase } from '../common-step.base';
import { WizardService } from '../../wizard.service';

@Component({
    selector: 'li-network',
    templateUrl: './network.component.html',
    styleUrls: ['./network.component.scss']
})
export class NetworkComponent extends CommonStepBase implements CommonStepBase {

    title = 'Network Configuration';

    constructor(
        protected wizardService: WizardService,
    ) {
        super(wizardService);
    }

}
