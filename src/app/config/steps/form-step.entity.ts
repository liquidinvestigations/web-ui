import { DynamicForm } from '../../shared/dynamic-forms/dynamic-form';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';
import { DynamicFormGroup } from '../../shared/dynamic-forms/group/dynamic-form-group';
import { WizardEntity } from '../wizard.entity';

export abstract class FormStepEntity {

    public dynamicFormConfig: (DynamicForm | DynamicFormGroup);
    private formInstance: DynamicFormComponent;

    private serverConfig: {} = null;

    abstract getDynamicFormConfig(): (DynamicForm | DynamicFormGroup);

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

    onNext(formValues): void {
        this.wizardEntity.updateConfigState(formValues);
    }

}
