import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LanComponent } from './network/lan/lan.component';
import { WanComponent } from './network/wan/wan.component';
import { UsersComponent } from './users/users.component';
import { NodesComponent } from './nodes/nodes.component';
import { StatusComponent } from './network/status/status.component';
import { ServicesComponent } from './services/services.component';
import { GeneralStatusComponent } from './general-status/general-status.component';
import { SshComponent } from './network/ssh/ssh.component';

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
                    icon: 'fa fa-th'
                }
            },
            {
                path: 'network',
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
                ],
                data: {
                    label: 'network',
                    icon: 'fa fa-server'
                }
            },
            {
                path: 'services',
                component: ServicesComponent,
                data: {
                    label: 'services',
                    icon: 'fa fa-list-ul'
                }
            },
            // {
            //     path: 'users',
            //     component: UsersComponent,
            //     data: {
            //         label: 'users',
            //         icon: 'fa fa-user-o'
            //     }
            // },
            // {
            //     path: 'nodes',
            //     component: NodesComponent,
            //     data: {
            //         label: 'discovery',
            //         icon: 'fa fa-globe'
            //     }
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
