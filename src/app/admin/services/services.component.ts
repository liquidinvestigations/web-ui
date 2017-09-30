import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SERVICES_FORM } from '../../shared/li-forms/services-form';
import { DynamicFormService } from '../../shared/dynamic-forms/dynamic-form.service';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { ServicesElementRendererComponent } from './services-element-renderer.component';
import { AdminEntity } from '../admin.entity';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';
import { AdminForm } from '../common/admin-form';
import { DynamicFormControl } from '../../shared/dynamic-forms/builder/dynamic-form-control';

@Component({
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
    viewProviders: [
        DynamicFormService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ServicesComponent extends AdminForm {
    @ViewChild(DynamicFormComponent) formComponent: DynamicFormComponent;

    dynamicFormConfig: DynamicFormGroup;

    constructor(
        protected dynamicFormService: DynamicFormService,
        protected adminEntity: AdminEntity
    ) {

        super(dynamicFormService, adminEntity);

        this.dynamicFormService
            .setRenderer(ServicesElementRendererComponent);

        // let serviceControls = SERVICES_FORM.controls;
        //
        // for (let i in serviceControls) {
        //     (serviceControls[i] as DynamicFormControl)
        //         .onChange((value, control) => {
        //             this.adminEntity.notifySubscribers(AdminEntity.API_UPDATE_SERVICE, control);
        //         });
        // }
        //
        // this.dynamicFormConfig = new DynamicFormGroup()
        //     .elements([ SERVICES_FORM ]);
    }

}
