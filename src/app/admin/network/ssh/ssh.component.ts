import { Component, ViewChild } from '@angular/core';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { WAN_FORM } from '../../../shared/li-forms/wan-form';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';
import { AdminForm } from '../../admin-form';
import { ApiClientService } from '../../../core/api-client.service';
import { SSH_FORM } from '../../../shared/li-forms/ssh-form';

@Component({
    templateUrl: './ssh.component.html',
    styleUrls: ['./ssh.component.scss'],
    viewProviders: [
        DynamicFormService
    ]
})
export class SshComponent extends AdminForm {
    @ViewChild(DynamicFormComponent) formViewInstance: DynamicFormComponent;

    endpoint: string = '/api/network/ssh';

    dynamicFormConfig: DynamicFormGroup;

    constructor(
        protected dynamicFormService: DynamicFormService,
        protected apiService: ApiClientService,
    ) {
        super(apiService);
        this.init();
    }


    getDynamicFormConfig() {

        this.dynamicFormService
            .setLabelCssClass('col-xs-12 col-sm-5 text-right')
            .setControlCssClass('col-xs-12 col-sm-7');

        return new DynamicFormGroup()
            .elements([SSH_FORM]);
    }

}
