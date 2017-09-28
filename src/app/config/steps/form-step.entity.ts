import { WizardEntity } from '../wizard.entity';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';

export abstract class FormStepEntity {

    private formInstance: DynamicFormComponent;

    private serverConfig: {} = null;

    abstract getDynamicFormConfig(): DynamicFormGroup;

    constructor(protected wizardEntity: WizardEntity) {
        // get current stepEntity form configuration
        this.serverConfig = wizardEntity.getConfigState();
    }

    setFormInstance(formInstance: DynamicFormComponent) {
        this.formInstance = formInstance;
    }

    updateValuesFromConfig() {
        this.formInstance
            .setValues(
                this.wizardEntity.getConfigState()
            );
    }

    updateConfigValues(formValues): void {
        this.wizardEntity.updateConfigState(formValues);
    }

}
