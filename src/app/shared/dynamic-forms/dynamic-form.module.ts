import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormService } from './dynamic-form.service';
import { DynamicFormGroupComponent } from './group/dynamic-form-group.component';
import { DynamicFormArrayComponent } from './group/dynamic-form-array.component';
import { DynamicFormElementComponent } from './elements/dynamic-form-element.component';
import { CustomElementRenderDirective } from './elements/render/dynamic-element-render.directive';
import { FormElementComponent } from './elements/form-element.component';
import { ElementValidationErrorComponent } from './elements/validation/element-validation-error.component';
import { DynamicElementMaskDirective } from './elements/render/dynamic-element-mask.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        DynamicFormComponent,
        DynamicFormGroupComponent,
        DynamicFormArrayComponent,
        DynamicFormElementComponent,
        FormElementComponent,

        ElementValidationErrorComponent,

        CustomElementRenderDirective,
        DynamicElementMaskDirective,
    ],
    providers: [
        DynamicFormService
    ],
    exports: [
        ReactiveFormsModule,

        DynamicFormComponent,
        FormElementComponent,

        ElementValidationErrorComponent,

        CustomElementRenderDirective,
    ]
})
export class DynamicFormModule { }
