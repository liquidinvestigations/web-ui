import { Component, OnInit } from '@angular/core';
import { CommonStepBase } from '../common-step.base';
import { WizardService } from '../../wizard.service';
import { WizardEntity } from '../../wizard.entity';

@Component({
    selector: 'li-summary-step',
    templateUrl: './summary-step.component.html',
    styleUrls: ['./summary-step.component.scss']
})
export class SummaryStepComponent extends CommonStepBase implements CommonStepBase {
    title = 'Summary';

    buttonConfig = {
        label: 'Install',
        iconClass: '',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.GO_NEXT);
        }
    };

    currentConfig: {};

    constructor(
        private wizardEntity: WizardEntity,
        protected wizardService: WizardService,
    ) {
        super(wizardService);

        this.currentConfig = this.wizardEntity.userConfig;
    }

}
