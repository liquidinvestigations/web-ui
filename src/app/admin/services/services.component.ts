import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SERVICES_FORM } from '../../shared/li-forms/services-form';
import { DynamicFormService } from '../../shared/dynamic-forms/dynamic-form.service';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { ServicesElementRendererComponent } from './services-element-renderer.component';
import { AdminEntity } from '../admin.entity';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';
import { AdminForm } from '../admin-form';
import { DynamicFormControl } from '../../shared/dynamic-forms/builder/dynamic-form-control';
import { ApiClientService } from '../../core/api-client.service';

@Component({
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
    viewProviders: [
        DynamicFormService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ServicesComponent extends AdminForm {
    @ViewChild(DynamicFormComponent) formViewInstance: DynamicFormComponent;

    endpoint: string = '/api/services';

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

        let serviceControls = SERVICES_FORM;

        this.handleOnChange(serviceControls.controls);

        return new DynamicFormGroup()
            .elements([ serviceControls ]);
    }

    filterApiValues(apiResponse: any) {
        let filteredServices = {};

        for (let service of apiResponse) {
            filteredServices[service.name] = service.is_enabled;
        }

        return {
            services: filteredServices
        };
    }

    private handleOnChange(serviceControls) {
        for (let i in serviceControls) {
            (serviceControls[i] as DynamicFormControl)
                .onChange((value, control) => {
                    this.updateService(control);
                });
        }
    }

    private updateService(control: DynamicFormControl) {
        return this.apiService
            .put('/api/services/' + control.id + '/enabled', { enabled: !!control.value });
    }

}
