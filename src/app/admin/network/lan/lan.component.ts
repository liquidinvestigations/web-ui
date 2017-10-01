import { Component, ViewChild } from '@angular/core';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { LAN_FORM } from '../../../shared/li-forms/lan-form';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';
import { AdminForm } from '../../admin-form';
import { ApiClientService } from '../../../core/api-client.service';

@Component({
    templateUrl: '../../admin-form.html',
    styleUrls: ['./lan.component.scss'],
    viewProviders: [
        DynamicFormService
    ]
})
export class LanComponent extends AdminForm {
    @ViewChild(DynamicFormComponent) formViewInstance: DynamicFormComponent;

    endpoint: string = '/api/network/lan';

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

        return LAN_FORM;
    }

}
