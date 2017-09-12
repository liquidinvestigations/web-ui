import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { WizardRoutingModule } from './wizard-routing.module';
import { WizardComponent } from './wizard.component';

import { GeneralComponent } from './steps/general/general.component';
import { ScenarioComponent } from './steps/scenario/scenario.component';
import { NetworkComponent } from './steps/network/network.component';
import { ServicesComponent } from './steps/services/services.component';
import { SummaryComponent } from './steps/summary/summary.component';
import { WizardService } from './wizard.service';
import { ProgressbarComponent } from './progressbar/progressbar.component';

@NgModule({
    imports: [
        WizardRoutingModule,
        CommonModule,
        SharedModule,
    ],
    declarations: [
        WizardComponent,
        GeneralComponent,
        ScenarioComponent,
        NetworkComponent,
        ServicesComponent,
        SummaryComponent,
        ProgressbarComponent,
    ],
    providers: [
        WizardService,
    ]
})
export class WizardModule {}
