import { Component, OnInit, ViewChild } from '@angular/core';
import { WAN_FORM } from '../../../shared/li-forms/wan-form';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { AdminEntity } from '../../admin.entity';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';
import { AdminForm } from '../../common/admin-form';

@Component({
    templateUrl: './wan.component.html',
    styleUrls: ['./wan.component.scss'],
    viewProviders: [
        DynamicFormService
    ]
})
export class WanComponent extends AdminForm {
    @ViewChild(DynamicFormComponent) formComponent: DynamicFormComponent;

    dynamicFormConfig: DynamicFormGroup;

    constructor(
        protected dynamicFormService: DynamicFormService,
        protected adminEntity: AdminEntity,
    ) {
        super(dynamicFormService, adminEntity);

        this.dynamicFormService
            .setLabelCssClass('col-xs-12 col-sm-5 text-right')
            .setControlCssClass('col-xs-12 col-sm-7');

        this.dynamicFormConfig = WAN_FORM;
    }

    successSubmit() {
        super.successSubmit();
        this.adminEntity.notifySubscribers(AdminEntity.API_UPDATE_NETWORK);
    }

}
