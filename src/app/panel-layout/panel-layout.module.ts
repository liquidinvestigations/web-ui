import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './sidebar/side-menu.component';
import { PanelLayoutComponent } from './panel-layout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        SideMenuComponent,
        PanelLayoutComponent
    ],
    exports: [
        PanelLayoutComponent
    ]
})
export class PanelLayoutModule {
}
