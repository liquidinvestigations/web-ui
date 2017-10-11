import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { WizardRoutingModule } from './wizard-routing.module';
import { WizardComponent } from './wizard.component';

import { WizardService } from './wizard.service';

import { ProgressbarComponent } from './progressbar/progressbar.component';
import { AdminStepComponent } from './steps/admin-step/admin-step.component';
import { LanStepComponent } from './steps/lan-step/lan-step.component';
import { WanStepComponent } from './steps/wan-step/wan-step.component';
import { ServicesStepComponent } from './steps/services-step/services-step.component';
import { SummaryStepComponent } from './steps/summary-step/summary-step.component';
import { FinalStepComponent } from './steps/final-step/final-step.component';
import { AdminStepEntity } from './steps/admin-step/admin-step.entity';
import { LanStepEntity } from './steps/lan-step/lan-step.entity';
import { WanStepEntity } from './steps/wan-step/wan-step.entity';
import { WelcomeStepComponent } from './steps/welcome-step/welcome-step.component';
import { ServicesStepEntity } from './steps/services-step/services-step.entity';
import { ServicesElementRendererComponent } from './steps/services-step/services-element-renderer.component';
import { WizardStateService } from './wizard-state.service';

@NgModule({
    imports: [
        WizardRoutingModule,
        CommonModule,
        SharedModule,
    ],
    declarations: [
        WizardComponent,

        ProgressbarComponent,

        WelcomeStepComponent,
        AdminStepComponent,
        LanStepComponent,
        WanStepComponent,

        ServicesStepComponent,
        ServicesElementRendererComponent,

        SummaryStepComponent,
        FinalStepComponent,
    ],
    entryComponents: [
        ServicesElementRendererComponent
    ],
    providers: [
        WizardService,
        WizardStateService,

        AdminStepEntity,
        LanStepEntity,
        WanStepEntity,
        ServicesStepEntity,
    ]
})
export class WizardModule {}
