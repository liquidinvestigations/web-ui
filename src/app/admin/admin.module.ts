import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { StatusComponent } from './status/status.component';

@NgModule({
    imports: [
        AdminRoutingModule,
        CommonModule,
        SharedModule,
        LayoutModule,
    ],
    declarations: [AdminComponent, StatusComponent]
})
export class AdminModule {
}
