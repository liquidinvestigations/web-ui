import { Component, ViewChild } from '@angular/core';
import { ApiClientService } from '../../../core/api-client.service';
import { mapSummaryConfig } from '../../../shared/li-forms/summary-mapping';
import { BsModalComponent } from '../../../shared/bs-modal/bs-modal.component';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../../../shared/dynamic-forms/builder/dynamic-form-control';
import { Validators } from '@angular/forms';
import { DynamicFormValidator } from '../../../shared/dynamic-forms/validation/dynamic-form.validator';

@Component({
    templateUrl: './status.component.html',
})
export class StatusComponent {
    currentConfig: {} = {
        domain: {},
        lan: {},
        wan: {},
        status: {},
    };

    constructor(protected apiService: ApiClientService) {

        apiService.get('/api/network/domain/')
            .subscribe((data) => {
                this.currentConfig['domain'] = {
                    title: 'Domain',
                    fields: [
                        {
                            label: data.domain,
                            fields: null,
                        }
                    ]
                };
            });

        apiService.get('/api/network/lan/')
            .subscribe((data) => {
                this.currentConfig['lan'] = {
                    title: 'Lan configuration',
                    fields: mapSummaryConfig({lan: data})['lan'].fields
                };
            });


        apiService.get('/api/network/wan/')
            .subscribe((data) => {
                this.currentConfig['wan'] = {
                    title: 'Wan configuration',
                    fields: mapSummaryConfig({wan: data})['wan'].fields
                };
            });

        apiService.get('/api/network/status/')
            .subscribe((data) => {
                this.currentConfig['status'] = {
                    title: 'Status',
                    fields: data && data['interfaces']
                        ? this.parseStatusData(data['interfaces'])
                        : null
                };
            });
    }

    parseStatusData(interfaces) {
        return interfaces.map((ip) => {
            return {
                label: ip.name,
                value: ip.label + ' ' + (ip.is_up ? '- Running' : '- Not Running'),
                error_message: ip.error_message,
            };
        });
    }
}
