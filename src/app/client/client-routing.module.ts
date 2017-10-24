import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    label: 'dashboard',
                    icon: 'fa fa-th',
                    pageTitle: 'Dashboard'
                }
            },
            {
                path: 'hoover',
                data: {
                    label: 'Hoover',
                    img: './assets/liquid-investigations/img/dummy.svg',
                    pageTitle: 'Hoover',
                    subdomain: 'hoover'
                }
            },
            {
                path: 'hypothesis',
                data: {
                    label: 'Hypothesis',
                    img: './assets/liquid-investigations/img/dummy.svg',
                    pageTitle: 'Hypothesis',
                    subdomain: 'hypothesis'
                }
            },
            {
                path: 'dokuwiki',
                data: {
                    label: 'DokuWiki',
                    img: './assets/liquid-investigations/img/dummy.svg',
                    pageTitle: 'DokuWiki',
                    subdomain: 'dokuwiki'
                }
            },
            {
                path: 'matrix',
                data: {
                    label: 'Matrix',
                    img: './assets/liquid-investigations/img/dummy.svg',
                    pageTitle: 'Matrix',
                    subdomain: 'matrix'
                }
            },
            {
                path: 'davros',
                data: {
                    label: 'Davros',
                    img: './assets/liquid-investigations/img/dummy.svg',
                    pageTitle: 'Davros',
                    subdomain: 'davros'
                }
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
