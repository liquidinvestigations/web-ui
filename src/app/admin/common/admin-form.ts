
import { AfterViewInit, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../../shared/dynamic-forms/dynamic-form.component';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormService } from '../../shared/dynamic-forms/dynamic-form.service';
import { AdminEntity } from '../admin.entity';

export abstract class AdminForm implements AfterViewInit {

    @ViewChild(DynamicFormComponent) abstract formComponent: DynamicFormComponent;

    abstract dynamicFormConfig: DynamicFormGroup;

    constructor(
        protected dynamicFormService: DynamicFormService,
        protected adminEntity: AdminEntity,
    ) {}

    ngAfterViewInit() {

        if (this.adminEntity.getConfigState()) {
            this.formComponent.setValues(this.adminEntity.getConfigState(), false);
        } else {
            this.adminEntity.subscribe(AdminEntity.API_CONFIG_LOADED, (config) => {
                this.formComponent.setValues(config, false);
            });
        }
    }

    successSubmit() {
        this.adminEntity.updateConfigState(
            this.formComponent.getValues()
        );
    }
}
