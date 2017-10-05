import { Injectable } from '@angular/core';
import { FormStepEntity } from '../form-step.entity';
import { SERVICES_FORM } from '../../../shared/li-forms/services-form';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { ServicesElementRendererComponent } from './services-element-renderer.component';
import { SSH_FORM } from '../../../shared/li-forms/ssh-form';
import { ApiClientService } from '../../../core/api-client.service';
import { WizardConfigStateEntity } from '../../wizard-config-state.entity';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServicesStepEntity extends FormStepEntity {
    endpoint: string = 'multi_api_requests';

    constructor(
        protected apiService: ApiClientService,
        private dynamicFormService: DynamicFormService,
        public wizardConfigState: WizardConfigStateEntity
    ) {
        super(apiService, wizardConfigState);
    }

    filterApiValues(apiResponses: any) {
        let filteredServices = {};

        for (let service of apiResponses[0]) {
            filteredServices[service.name] = service.is_enabled;
        }

        return {
            services: filteredServices,
            ssh: apiResponses[1].ssh
        };
    }

    getDynamicFormConfig(): DynamicFormGroup {

        this.dynamicFormService
            .setRenderer(ServicesElementRendererComponent);

        return new DynamicFormGroup()
            .elements([
                SSH_FORM,
                SERVICES_FORM,
            ]);
    }

    getApiEntityConfig() {
        return this.apiService.get([
            '/api/services',
            '/api/network/ssh'
        ]);
    }

    updateApiEntityConfig(formConfig: {}) {
        let requests = [];

        let services = formConfig['services'];

        for (let i in services) {
            requests.push(
                this.apiService
                    .put('/api/services/' + i + '/enabled', {enabled: services[i] === true})
            );
        }

        requests.push(
            this.apiService
                .put('/api/network/ssh', formConfig['ssh'])
        );

        return Observable.forkJoin(requests);
    }

}
