import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'client',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login/:redirect',
        component: LoginComponent
    },
    {
        path: 'client',
        loadChildren: './client/client.module#ClientModule'
    },
    {
        path: 'config',
        loadChildren: './config/wizard.module#WizardModule'
    },
    {
        path: 'admin-ui',
        loadChildren: './admin/admin.module#AdminModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
