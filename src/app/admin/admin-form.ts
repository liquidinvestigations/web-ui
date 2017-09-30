import { ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../shared/dynamic-forms/dynamic-form.component';
import { DynamicFormGroup } from '../shared/dynamic-forms/builder/dynamic-form-group';
import { ApiClientService } from '../core/api-client.service';

export abstract class AdminForm {
    @ViewChild(DynamicFormComponent) abstract formViewInstance: DynamicFormComponent;

    abstract endpoint: string;

    dynamicFormConfig: DynamicFormGroup;
    isLoading: boolean = false;

    private usePost: boolean = false;

    constructor(protected apiService: ApiClientService) {
    }

    init() {
        this.dynamicFormConfig = this.getDynamicFormConfig();

        console.log(this.dynamicFormConfig);

        if (this.endpoint) {
            this.refreshConfig();
        }
    }

    refreshConfig() {
        this.getApiEntityConfig()
            .subscribe((apiConfig: any) => {
                this.dynamicFormConfig
                    .patchValue(this.filterApiValues(apiConfig), {emitEvent: false});

                this.dynamicFormConfig.enable();
            });
    }

    getDynamicFormConfig() {
        return null;
    }

    filterApiValues(apiConfig: any) {
        return apiConfig;
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

    successSubmit(formConfig: {}) {
        this.isLoading = true;
        this.dynamicFormConfig.disable();

        this.updateWithFormValues(formConfig)
            .subscribe(() => {
                this.isLoading = true;
                this.refreshConfig();
            });
    }

}
