import { Component, ViewChild } from '@angular/core';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';
import { AdminForm } from '../../admin-form';
import { ApiClientService } from '../../../core/api-client.service';
import { SSH_FORM } from '../../../shared/li-forms/ssh-form';

@Component({
    templateUrl: './ssh.component.html',
    styleUrls: ['../../admin-form.scss'],
})
export class SshComponent extends AdminForm {
    @ViewChild(DynamicFormComponent) formViewInstance: DynamicFormComponent;

    endpoint: string = '/api/network/ssh/';

    dynamicFormConfig: DynamicFormGroup;

    currentConfig: {} = {
        domain: "",
    }

    constructor(
        protected dynamicFormService: DynamicFormService,
        protected apiService: ApiClientService,
    ) {
        super(apiService);
        this.init();

        apiService.get('/api/network/domain/')
            .subscribe((data) => {
                this.currentConfig['domain'] = data.domain;
            });
    }


    getDynamicFormConfig() {
        this.dynamicFormService
            .setLabelCssClass('col-xs-12 col-sm-3 text-right')
            .setControlCssClass('col-xs-12 col-sm-8');

        return SSH_FORM;
    }

}
