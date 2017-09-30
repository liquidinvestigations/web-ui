import { Component } from '@angular/core';
import { CommonStepBase } from '../common-step.base';
import { WizardService } from '../../wizard.service';
import { WizardConfigStateEntity } from '../../wizard-config-state.entity';

@Component({
    templateUrl: './final-step.component.html',
    styleUrls: ['./final-step.component.scss']
})
export class FinalStepComponent extends CommonStepBase {

    title = '';

    buttonConfig = null;

    url = '';

    constructor(
        protected wizardService: WizardService,
        public wizardConfigStateEntity: WizardConfigStateEntity
    ) {
        super(wizardService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.url = this.wizardConfigStateEntity.getConfigState()['domain'];
    }

}
