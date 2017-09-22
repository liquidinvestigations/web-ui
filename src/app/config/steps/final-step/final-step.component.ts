import { Component } from '@angular/core';
import { CommonStepBase } from '../common-step.base';
import { WizardEntity } from '../../wizard.entity';
import { WizardService } from '../../wizard.service';

@Component({
    templateUrl: './final-step.component.html',
    styleUrls: ['./final-step.component.scss']
})
export class FinalStepComponent extends CommonStepBase implements CommonStepBase {

    title = '';

    buttonConfig = null;

    url = '';

    constructor(
        private wizardEntity: WizardEntity,
        protected wizardService: WizardService
    ) {
        super(wizardService);

        if (this.wizardEntity.userConfig) {
            this.url = this.wizardEntity.userConfig['network'].domain;
        }
    }

}
