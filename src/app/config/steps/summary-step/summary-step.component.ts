import { Component, OnInit } from '@angular/core';
import { CommonStepBase } from '../common-step.base';
import { WizardService } from '../../wizard.service';
import { WizardEntity } from '../../wizard.entity';
import { mapSummaryConfig } from '../../../core/li-forms/summary-mapping';

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
        buttonClass: 'btn btn-primary',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.GO_NEXT);
        },
        isDisabled: () => this.buttonDisabled
    };

    currentConfig: {};

    constructor(
        private wizardEntity: WizardEntity,
        protected wizardService: WizardService,
    ) {
        super(wizardService);

        if (this.wizardEntity.userConfig) {
            this.currentConfig = mapSummaryConfig(
                this.wizardEntity.userConfig
            );
        }
    }

    onNext() {
        this.wizardEntity.notifySubscribers(WizardEntity.API_UPDATE_CONFIG);
    }

}
