import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'liquid-investigations',
    },
    {
        path: 'liquid-investigations',
        loadChildren: './liquid-investigations/liquid-investigations.module#LiquidInvestigationsModule'
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
