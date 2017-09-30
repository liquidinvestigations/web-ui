import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { ApiClientService } from '../../core/api-client.service';
import { WizardConfigStateEntity } from '../wizard-config-state.entity';

export abstract class FormStepEntity {
    private formInstance: DynamicFormGroup;
    private usePost: boolean = false;

    abstract endpoint: string;

    abstract getDynamicFormConfig(): DynamicFormGroup;

    constructor(
        protected apiService: ApiClientService,
        public wizardConfigState: WizardConfigStateEntity
    ) {}

    init() {
        if (this.endpoint) {

            this.getApiEntityConfig()
                .subscribe((apiConfig: any) => {
                    this.getFormInstance()
                        .patchValue(this.filterApiValues(apiConfig), { emitEvent: false });
                });
        }
    }

    filterApiValues(apiConfig: any) {
        return apiConfig;
    }

    getFormInstance() {
        return this.formInstance;
    }

    setFormInstance(formInstance: DynamicFormGroup) {
        this.formInstance = formInstance;
    }

    getApiEntityConfig() {
        return this.apiService
            .get(this.endpoint)
            .map(res => res.json());
    }

    createOnSubmit() {
        this.usePost = true;
    }

    updateWithFormValues(formConfig?: {}) {
        if (this.usePost) {
            return this.createApiEntityConfig(formConfig);
        } else {
            return this.updateApiEntityConfig(formConfig);
        }
    }

    createApiEntityConfig(formConfig: {}): any {
        return this.apiService
            .post(this.endpoint, formConfig);
    }


    updateApiEntityConfig(formConfig: {}): any {
        return this.apiService
            .put(this.endpoint, formConfig);
    }

}
