import { CommonStepBase } from './common-step.base';
import { WizardService } from '../wizard.service';
import { FormComponent } from '../../shared/form/form.component';
import { Entity } from '../../shared/entity/entity';

export abstract class FormStepBase extends CommonStepBase implements CommonStepBase {
    abstract formComponent: FormComponent;

    constructor(
        public entity: Entity,
        protected wizardService: WizardService
    ) {
        super(wizardService);
    }

    ngOnInit() {
        this.entity.setForm(this.formComponent);
        this.entity.setDefaultValues();
    }

    onControlsClick(direction: string) {
        this.entity.submitAction(this.formComponent.getValues());
        super.onControlsClick(direction);
    }
}
