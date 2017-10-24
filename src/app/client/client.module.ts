import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelLayoutModule } from '../panel-layout/panel-layout.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ClientRoutingModule,
        PanelLayoutModule,
        SharedModule,
    ],
    declarations: [
        ClientComponent,
        DashboardComponent
    ]
})
export class ClientModule { }
