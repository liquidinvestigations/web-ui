import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormGroupComponent } from './components/dynamic-form-group.component';
import { DynamicFormService } from './dynamic-form.service';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormValidationComponent } from './components/dynamic-form-validation.component';
import { DynamicControlMaskDirective } from './components/render/dynamic-control-mask.directive';
import { DynamicFormControlComponent } from './components/dynamic-form-control.component';
import { DynamicElementComponent } from './components/dynamic-element.component';
import { CustomElementRenderDirective } from './components/render/dynamic-element-render.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        DynamicFormComponent,
        DynamicFormGroupComponent,
        DynamicFormControlComponent,
        DynamicElementComponent,

        DynamicFormValidationComponent,

        DynamicControlMaskDirective,
        CustomElementRenderDirective,
    ],
    providers: [
        DynamicFormService,
    ],
    exports: [
        ReactiveFormsModule,
        DynamicFormComponent,
        DynamicElementComponent,
        DynamicFormValidationComponent,

        CustomElementRenderDirective,
    ]
})
export class DynamicFormModule {}