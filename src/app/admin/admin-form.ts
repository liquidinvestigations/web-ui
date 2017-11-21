import { ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../shared/dynamic-forms/dynamic-form.component';
import { DynamicFormGroup } from '../shared/dynamic-forms/builder/dynamic-form-group';
import { ApiClientService } from '../core/api-client.service';

export abstract class AdminForm {
    @ViewChild(DynamicFormComponent) abstract formViewInstance: DynamicFormComponent;

    abstract endpoint: string;

    dynamicFormConfig: DynamicFormGroup;

    isLoading: boolean = false;
    disableOnUpdate: boolean = true;

    private usePost: boolean = false;

    buttonConfig = {
        label: 'Update',
        iconClass: 'glyphicon glyphicon-ok',
        buttonClass: 'btn btn-primary',
        action: () => {
            // if successful will call successSubmit
            this.formViewInstance.onSubmit();
        },
        isLoading: () => this.isLoading
    };

    constructor(protected apiService: ApiClientService) {
        apiService.subscribe([
            ApiClientService.EV_BEFORE_PUT,
            ApiClientService.EV_BEFORE_POST
        ], () => {
            this.isLoading = true;

            if (this.disableOnUpdate) {
                this.dynamicFormConfig.disable();
            }
        });
    }

    init() {
        this.dynamicFormConfig = this.getDynamicFormConfig();

        if (this.endpoint) {
            this.refreshConfig();
        }
    }

    refreshConfig() {
        this.getApiEntityConfig()
            .subscribe((apiConfig: any) => {
                this.dynamicFormConfig
                    .patchValue(this.filterApiValues(apiConfig), {emitEvent: false});

                if (this.disableOnUpdate) {
                    this.dynamicFormConfig.enable();
                }
            });
    }

    getDynamicFormConfig() {
        return null;
    }

    filterApiValues(apiConfig: any) {
        return apiConfig;
    }

    getApiEntityConfig() {
        return this.apiService.get(this.endpoint);
    }

    createOnSubmit() {
        this.usePost = true;
    }

    updateWithFormValues(formConfig?: {}) {
        formConfig = this.beforeSubmit(formConfig);

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
        this.updateWithFormValues(formConfig)
            .subscribe(
                () => {
                    this.isLoading = false;
                    this.refreshConfig();
                },
                () => {
                    this.dynamicFormConfig.enable();
                    this.isLoading = false;
                }
            );
    }

    beforeSubmit(formConfig) {
        return formConfig;
    }
}
