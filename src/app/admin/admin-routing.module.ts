import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { ServicesComponent } from './services/services.component';
import { GeneralStatusComponent } from './general-status/general-status.component';
import { NetworkComponent } from './network/network.component';
import { StatusComponent } from './network/status/status.component';
import { LanComponent } from './network/lan/lan.component';
import { WanComponent } from './network/wan/wan.component';
import { SshComponent } from './network/ssh/ssh.component';
import { VpnComponent } from './vpn/vpn.component';
import { VpnStatusComponent } from './vpn/status/vpn-status.component';
import { VpnKeysComponent } from './vpn/keys/vpn-keys.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'status'
            },
            {
                path: 'status',
                component: GeneralStatusComponent,
                data: {
                    label: 'status',
                    icon: 'fa fa-th',
                    pageTitle: 'General status'
                }
            },
            {
                path: 'network',
                component: NetworkComponent,
                data: {
                    label: 'network',
                    icon: 'fa fa-server',
                    pageTitle: 'Network configuration'
                },
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'status'
                    },
                    {
                        path: 'status',
                        component: StatusComponent,
                        data: {
                            label: 'Status',
                            icon: 'fa fa-line-chart'
                        }
                    },
                    {
                        path: 'lan',
                        component: LanComponent,
                        data: {
                            label: 'lan',
                            icon: 'fa fa-share-alt'
                        }
                    },
                    {
                        path: 'wan',
                        component: WanComponent,
                        data: {
                            label: 'wan',
                            icon: 'fa fa-wifi'
                        }
                    },
                    {
                        path: 'ssh',
                        component: SshComponent,
                        data: {
                            label: 'SSH',
                            icon: 'fa fa-key'
                        }
                    }
                ]
            },
            {
                path: 'vpn',
                component: VpnComponent,
                data: {
                    label: 'vpn',
                    icon: 'fa fa-server',
                    pageTitle: 'VPN configuration'
                },
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'status'
                    },
                    {
                        path: 'status',
                        component: VpnStatusComponent,
                        data: {
                            label: 'Status',
                            icon: 'fa fa-line-chart'
                        }
                    },
                    {
                        path: 'keys',
                        component: VpnKeysComponent,
                        data: {
                            label: 'Manage keys',
                            icon: 'fa fa-key'
                        }
                    },
                ]
            },
            {
                path: 'services',
                component: ServicesComponent,
                data: {
                    label: 'services',
                    icon: 'fa fa-list-ul',
                    pageTitle: 'Services'
                }
            },
            {
                path: 'users',
                component: UsersComponent,
                data: {
                    label: 'users',
                    icon: 'fa fa-user-o',
                    pageTitle: 'Users'
                }
            },
            {
                path: 'discovery',
                component: DiscoveryComponent,
                data: {
                    label: 'discovery',
                    icon: 'fa fa-globe',
                    pageTitle: 'Discovery'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
