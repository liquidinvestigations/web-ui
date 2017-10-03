import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { WAN_FORM } from '../../../shared/li-forms/wan-form';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';
import { AdminForm } from '../../admin-form';
import { ApiClientService } from '../../../core/api-client.service';

@Component({
    templateUrl: '../../admin-form.html',
    styleUrls: ['../../admin-form.scss'],
    encapsulation: ViewEncapsulation.None,
    viewProviders: [
        DynamicFormService
    ]
})
export class WanComponent extends AdminForm {
    @ViewChild(DynamicFormComponent) formViewInstance: DynamicFormComponent;

    endpoint: string = '/api/network/wan';

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
            .setLabelCssClass('col-xs-12 col-sm-3 text-right')
            .setControlCssClass('col-xs-12 col-sm-6');

        return WAN_FORM;
    }

}
