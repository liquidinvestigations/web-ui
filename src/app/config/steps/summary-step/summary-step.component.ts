import { Component } from '@angular/core';
import { CommonStepBase } from '../common-step.base';
import { WizardService } from '../../wizard.service';
import { mapSummaryConfig } from '../../../shared/li-forms/summary-mapping';
import { WizardConfigStateEntity } from '../../wizard-config-state.entity';

@Component({
    selector: 'li-summary-step',
    templateUrl: './summary-step.component.html',
    styleUrls: ['./summary-step.component.scss']
})
export class SummaryStepComponent extends CommonStepBase {
    title = 'Summary';

    buttonConfig = {
        label: 'Complete',
        iconClass: '',
        buttonClass: 'btn btn-primary',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.GO_NEXT);
        },
        isDisabled: () => this.buttonDisabled,
        isLoading: () => false
    };

    currentConfig: {};

    constructor(
        protected wizardService: WizardService,
        public wizardConfigStateEntity: WizardConfigStateEntity
    ) {
        super(wizardService);

        this.currentConfig = mapSummaryConfig(
            wizardConfigStateEntity.getConfigState()
        );
    }

    onNext() {
        // we should trigger the device restart
    }

}
