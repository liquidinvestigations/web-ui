import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './static/404/not-found.component';

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
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
