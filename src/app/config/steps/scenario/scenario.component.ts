import { Component } from '@angular/core';
import { CommonStepBase } from '../common-step.base';
import { WizardService } from '../../wizard.service';

@Component({
    selector: 'li-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent extends CommonStepBase implements CommonStepBase {

    title = 'Scenario Selection';

    constructor(
        protected wizardService: WizardService,
    ) {
        super(wizardService);
    }

}
