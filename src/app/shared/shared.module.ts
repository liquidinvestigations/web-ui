import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynamic-forms/dynamic-form.module';

@NgModule({
    imports: [
        CommonModule,
        DynamicFormModule,
    ],
    declarations: [
    ],
    providers: [
    ],
    exports: [
        DynamicFormModule
    ]
})
export class SharedModule {}
