import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynamic-forms/dynamic-form.module';
import { BsModalComponent } from './bs-modal/bs-modal.component';

@NgModule({
    imports: [
        CommonModule,
        DynamicFormModule,
    ],
    declarations: [
        BsModalComponent
    ],
    providers: [
    ],
    exports: [
        DynamicFormModule,
        BsModalComponent
    ]
})
export class SharedModule {}
