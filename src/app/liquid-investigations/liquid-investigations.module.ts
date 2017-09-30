import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiquidInvestigationsRoutingModule } from './liquid-investigations-routing.module';
import { LiquidInvestigationsComponent } from './liquid-investigations.component';

@NgModule({
    imports: [
        CommonModule,
        LiquidInvestigationsRoutingModule
    ],
    declarations: [LiquidInvestigationsComponent]
})
export class LiquidInvestigationsModule {
}
