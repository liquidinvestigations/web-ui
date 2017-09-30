import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiquidInvestigationsComponent } from './liquid-investigations.component';

const routes: Routes = [
    {
        path: '',
        component: LiquidInvestigationsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LiquidInvestigationsRoutingModule {
}
