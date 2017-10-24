import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynamic-forms/dynamic-form.module';
import { BsModalComponent } from './bs-modal/bs-modal.component';
import { TrustPipe } from './trust.pipe';
import { IframeComponent } from './iframe.component';

@NgModule({
    imports: [
        CommonModule,
        DynamicFormModule,
    ],
    declarations: [
        BsModalComponent,
        IframeComponent,
        TrustPipe,
    ],
    providers: [
    ],
    exports: [
        DynamicFormModule,
        BsModalComponent,
        IframeComponent,
        TrustPipe,
    ]
})
export class SharedModule {}
