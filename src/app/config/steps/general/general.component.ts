import { Component, ViewChild } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { GeneralEntity } from './general.entity';
import { CommonStepBase } from '../common-step.base';
import { ApiClientService } from '../../../core/api-client.service';
import { FormComponent } from '../../../shared/form/form/form.component';

@Component({
    selector: 'li-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent extends CommonStepBase implements CommonStepBase {

    @ViewChild(FormComponent) formComponent: FormComponent;

    title = 'General Configuration';

    constructor(
        public entity: GeneralEntity,
        protected apiService: ApiClientService,
        protected wizardService: WizardService,
    ) {
        super(wizardService);
    }

    ngOnInit() {
        this.entity.setForm(this.formComponent);
        super.ngOnInit();
    }

    onControlsClick(direction: string) {
        this.entity.submitAction();

        this.apiService.subscribe(ApiClientService.EV_GET_SUCCESSFUL, (data) => {
            super.onControlsClick(direction);
        });
    }

}
