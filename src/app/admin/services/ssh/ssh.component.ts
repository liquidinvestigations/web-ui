import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SSH_FORM } from '../../../shared/li-forms/ssh-form';
import { ServicesElementRendererComponent } from '../services-element-renderer.component';
import { DynamicFormService } from '../../../shared/dynamic-forms/dynamic-form.service';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { AdminForm } from '../../common/admin-form';
import { DynamicFormComponent } from '../../../shared/dynamic-forms/dynamic-form.component';
import { AdminEntity } from '../../admin.entity';

@Component({
    templateUrl: './ssh.component.html',
    styleUrls: ['./ssh.component.scss'],
    encapsulation: ViewEncapsulation.None,
    viewProviders: [
        DynamicFormService
    ]
})
export class SshComponent extends AdminForm implements AfterViewInit {
    @ViewChild(DynamicFormComponent) formComponent: DynamicFormComponent;

    dynamicFormConfig: DynamicFormGroup;

    constructor(
        protected dynamicFormService: DynamicFormService,
        protected adminEntity: AdminEntity
    ) {
        super(dynamicFormService, adminEntity);

        this.dynamicFormService
            .setRenderer(ServicesElementRendererComponent);

        this.dynamicFormConfig = new DynamicFormGroup()
            .elements([ SSH_FORM ]);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();

        this.formComponent.cdRef.detectChanges();

        this.adminEntity.subscribe(AdminEntity.API_CONFIG_LOADED, (config) => {
            this.formComponent.cdRef.detectChanges();
        });
    }

    successSubmit() {
        super.successSubmit();
        this.adminEntity.notifySubscribers(AdminEntity.API_UPDATE_NETWORK);
    }
}
