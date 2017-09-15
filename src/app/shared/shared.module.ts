import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsBootstrapUIModule } from '@ng-dynamic-forms/ui-bootstrap/src/dynamic-bootstrap-form-ui.module';
import { DynamicFormsCoreModule, DynamicFormService, DynamicFormValidationService } from '@ng-dynamic-forms/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,

        DynamicFormsCoreModule.forRoot(),
        DynamicFormsBootstrapUIModule,
    ],
    declarations: [
        FormComponent,
    ],
    providers: [
        DynamicFormService,
        DynamicFormValidationService
    ],
    exports: [
        FormComponent
    ]
})
export class SharedModule {}
