import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form/form.component';
import { ElementComponent } from './form/elements/element.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        FormComponent,
        ElementComponent,
    ],
    exports: [
        FormComponent
    ]
})
export class SharedModule {}
