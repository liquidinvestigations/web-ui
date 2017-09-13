import { Component } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { GeneralEntity } from './general.entity';
import { CommonStepBase } from '../common-step.base';

@Component({
    selector: 'li-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent extends CommonStepBase implements CommonStepBase {

    title = 'General Configuration';

    constructor(
        public entity: GeneralEntity,
        protected wizardService: WizardService,
    ) {
        super(wizardService);
    }

    onControlsClick(direction: string) {
        switch (direction) {

            case WizardService.IS_NEXT:
                this.entity.submitAction();
                this.wizardService.goNextStep();
                break;

            case WizardService.IS_PREV:
                this.entity.submitAction();
                this.wizardService.goPreviousStep();
                break;
        }
    }

}
