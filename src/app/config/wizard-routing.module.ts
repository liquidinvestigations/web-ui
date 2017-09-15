import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizardComponent } from './wizard.component';

import { AdminStepComponent } from './steps/admin-step/admin-step.component';
import { LanStepComponent } from './steps/lan-step/lan-step.component';
import { WanStepComponent } from './steps/wan-step/wan-step.component';
import { ServicesStepComponent } from './steps/services-step/services-step.component';
import { SummaryStepComponent } from './steps/summary-step/summary-step.component';
import { FinalStepComponent } from './steps/final-step/final-step.component';
import { WelcomeStepComponent } from './steps/welcome-step/welcome-step.component';

const routes: Routes = [
    {
        path: '',
        component: WizardComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: WelcomeStepComponent,
            },
            {
                path: 'admin',
                component: AdminStepComponent
            },
            {
                path: 'lan',
                component: LanStepComponent
            },
            {
                path: 'wan',
                component: WanStepComponent
            },
            {
                path: 'services',
                component: ServicesStepComponent
            },
            {
                path: 'summary',
                component: SummaryStepComponent
            },
            {
                path: 'final',
                component: FinalStepComponent
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
