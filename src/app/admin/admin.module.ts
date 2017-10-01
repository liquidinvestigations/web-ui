import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ServicesComponent } from './services/services.component';
import { LanComponent } from './network/lan/lan.component';
import { WanComponent } from './network/wan/wan.component';
import { UsersComponent } from './users/users.component';
import { NodesComponent } from './nodes/nodes.component';
import { AdminRoutingModule } from './admin-routing.module';
import { GeneralStatusComponent } from './general-status/general-status.component';
import { SshComponent } from './network/ssh/ssh.component';
import { StatusComponent } from './network/status/status.component';
import { PanelLayoutModule } from '../panel-layout/panel-layout.module';
import { SharedModule } from '../shared/shared.module';
import { ServicesElementRendererComponent } from './services/services-element-renderer.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        PanelLayoutModule,
    ],

    declarations: [
        AdminComponent,

        GeneralStatusComponent,

        StatusComponent,
        LanComponent,
        WanComponent,
        SshComponent,

        ServicesComponent,
        ServicesElementRendererComponent,

        UsersComponent,
        NodesComponent,

    ],
    entryComponents: [
        ServicesElementRendererComponent
    ],
    exports: [
    ]
})
export class AdminModule {
}
