import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynamic-forms/dynamic-form.module';
import { BsModalComponent } from './bs-modal/bs-modal.component';
import { TrustPipe } from './trust.pipe';
import { AboutComponent } from '../static/about/about.component';

@NgModule({
    imports: [
        CommonModule,
        DynamicFormModule,
    ],
    declarations: [
        BsModalComponent,
        TrustPipe,
        AboutComponent,
    ],
    providers: [
    ],
    exports: [
        DynamicFormModule,
        BsModalComponent,
        TrustPipe,
        AboutComponent,
    ]
})
export class SharedModule {}
