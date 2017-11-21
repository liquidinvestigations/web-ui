import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './static/404/not-found.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-ui',
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
