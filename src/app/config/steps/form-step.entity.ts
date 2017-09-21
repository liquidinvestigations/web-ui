import { DynamicForm } from '../../shared/dynamic-forms/dynamic-form';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';
import { DynamicFormGroup } from '../../shared/dynamic-forms/group/dynamic-form-group';
import { WizardEntity } from '../wizard.entity';

export abstract class FormStepEntity {

    public dynamicFormConfig: (DynamicForm | DynamicFormGroup);
    private formInstance: DynamicFormComponent;

    private serverConfig: {} = null;

    abstract getDynamicFormConfig(): (DynamicForm | DynamicFormGroup);

    // we customly manage the submit
    abstract submitAction(...args): void;

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

    setDefaultValues() {

        console.log(this.getFormInstance(), this.wizardEntity.getConfigState())

            this.getFormInstance()
                .setValues(
                    this.wizardEntity.getConfigState()
                );

    }

    configWasLoaded() {
        return !!this.serverConfig;
    }

    populateFromConfig(element, fieldsMapping, FormGroup) {
        let fieldPath = fieldsMapping[element.id];

        let value = this.serverConfig;
        try {
            for (let key of fieldPath) {
                value = value[key];
            }
        } catch (e) {
            return '';
        }

        return value || '';
    }

}
