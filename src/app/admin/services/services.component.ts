import { Component, ViewChild } from '@angular/core';
import { SERVICES_FORM } from '../../shared/li-forms/services-form';
import { DynamicFormService } from '../../shared/dynamic-forms/dynamic-form.service';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { ServicesElementRendererComponent } from './services-element-renderer.component';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';
import { AdminForm } from '../admin-form';
import { DynamicFormControl } from '../../shared/dynamic-forms/builder/dynamic-form-control';
import { ApiClientService } from '../../core/api-client.service';

@Component({
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
})
export class ServicesComponent extends AdminForm {
    @ViewChild(DynamicFormComponent) formViewInstance: DynamicFormComponent;

    endpoint: string = '/api/services/';

    disableOnUpdate = false;

    constructor(
        protected dynamicFormService: DynamicFormService,
        protected apiService: ApiClientService,
    ) {
        super(apiService);
        this.init();
    }

    getDynamicFormConfig() {

        this.dynamicFormService
            .setRenderer(ServicesElementRendererComponent);

        return new DynamicFormGroup();
    }

    refreshConfig() {
        this.getApiEntityConfig()
            .subscribe((apiConfig: any) => {

                let filteredServices = this.filterApiValues(apiConfig);

                this.dynamicFormConfig = SERVICES_FORM(filteredServices);

                this.handleControls(this.dynamicFormConfig, apiConfig);

                this.dynamicFormConfig
                    .patchValue(filteredServices, { emitEvent: false });

                if (this.disableOnUpdate) {
                    this.dynamicFormConfig.enable();
                }
            });
    }

    filterApiValues(apiResponse: any) {
        let filteredServices = {};

        for (let service of apiResponse) {
            filteredServices[service.name] = service.is_enabled;
        }

        return filteredServices;
    }

    private handleControls(formGroup, apiConfig) {
        for (let service of apiConfig) {

            if (formGroup.controls[service.name]) {
                formGroup.controls[service.name]
                    .addViewInfo(service)
                    .onChange((value, control) => {
                        this.updateService(control);
                    });
            }
        }
    }

    private updateService(control: DynamicFormControl) {
        return this.apiService
            .put('/api/services/' + control.id + '/enabled/', { is_enabled: !!control.value })
            .subscribe(() => {
                this.refreshConfig();
            });
    }

}
