import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ServicesComponent } from './services/services.component';
import { UsersComponent } from './users/users.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { AdminRoutingModule } from './admin-routing.module';
import { GeneralStatusComponent } from './general-status/general-status.component';
import { PanelLayoutModule } from '../panel-layout/panel-layout.module';
import { SharedModule } from '../shared/shared.module';
import { ServicesElementRendererComponent } from './services/services-element-renderer.component';
import { NetworkComponent } from './network/network.component';
import { StatusComponent } from './network/status/status.component';
import { LanComponent } from './network/lan/lan.component';
import { WanComponent } from './network/wan/wan.component';
import { SshComponent } from './network/ssh/ssh.component';
import { VpnComponent } from './vpn/vpn.component';
import { VpnStatusComponent } from './vpn/status/vpn-status.component';
import { VpnKeysComponent } from './vpn/keys/vpn-keys.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        PanelLayoutModule,
    ],

    declarations: [
        AdminComponent,

        NetworkComponent,
        GeneralStatusComponent,

        StatusComponent,
        LanComponent,
        WanComponent,
        SshComponent,

        ServicesComponent,
        ServicesElementRendererComponent,

        UsersComponent,
        DiscoveryComponent,

        VpnComponent,
        VpnStatusComponent,
        VpnKeysComponent,
    ],
    entryComponents: [
        ServicesElementRendererComponent
    ],
    exports: [
    ]
})
export class AdminModule {
}
