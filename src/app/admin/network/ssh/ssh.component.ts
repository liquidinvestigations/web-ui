import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { WAN_FORM } from '../../../shared/li-forms/wan-form';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';
import { AdminForm } from '../../admin-form';
import { ApiClientService } from '../../../core/api-client.service';
import { SSH_FORM } from '../../../shared/li-forms/ssh-form';

@Component({
    templateUrl: '../../admin-form.html',
    styleUrls: ['../../admin-form.scss'],
    encapsulation: ViewEncapsulation.None
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
            .resetCssClasses()
            .setLabelCssClass('col-xs-12 col-sm-3 text-right')
            .setControlCssClass('col-xs-12 col-sm-8');

        return new DynamicFormGroup()
            .elements([SSH_FORM]);
    }

}
