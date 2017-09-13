import { Component } from '@angular/core';
import { CommonStepBase } from '../common-step.base';
import { WizardService } from '../../wizard.service';

@Component({
    selector: 'li-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends CommonStepBase implements CommonStepBase {

    title = 'Summary';

    constructor(
        protected wizardService: WizardService,
    ) {
        super(wizardService);
    }

}
