import { WizardEntity } from '../wizard.entity';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';

export abstract class FormStepEntity {

    public dynamicFormConfig: DynamicFormGroup;
    private formInstance: DynamicFormComponent;

    private serverConfig: {} = null;

    abstract getDynamicFormConfig(): DynamicFormGroup;

    constructor(protected wizardEntity: WizardEntity) {
        // get current stepEntity form configuration
        this.dynamicFormConfig = this.getDynamicFormConfig();
        this.serverConfig = wizardEntity.getConfigState();
    }

    setFormInstance(formInstance: DynamicFormComponent) {
        this.formInstance = formInstance;
    }

    getFormInstance(): DynamicFormComponent {
        return this.formInstance;
    }

    updateValuesFromConfig() {
        this.getFormInstance()
            .setValues(
                this.wizardEntity.getConfigState()
            );
    }

    updateConfigValues(formValues): void {
        this.wizardEntity.updateConfigState(formValues);
    }

}
