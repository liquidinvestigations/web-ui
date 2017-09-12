import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { WizardComponent } from './wizard.component';
import { GeneralComponent } from './steps/general/general.component';
import { NetworkComponent } from './steps/network/network.component';
import { ScenarioComponent } from './steps/scenario/scenario.component';
import { ServicesComponent } from './steps/services/services.component';
import { SummaryComponent } from './steps/summary/summary.component';

const routes: Routes = [
    {
        path: '',
        component: WizardComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'general'
            },
            {
                path: 'general',
                component: GeneralComponent
            },
            {
                path: 'network',
                component: NetworkComponent
            },
            {
                path: 'scenario',
                component: ScenarioComponent
            },
            {
                path: 'services',
                component: ServicesComponent
            },
            {
                path: 'summary',
                component: SummaryComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WizardRoutingModule {
}
