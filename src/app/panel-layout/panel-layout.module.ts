import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './sidebar/side-menu.component';
import { PanelLayoutComponent } from './panel-layout.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        SideMenuComponent,
        TabsComponent,
        PanelLayoutComponent
    ],
    exports: [
        TabsComponent,
        PanelLayoutComponent
    ]
})
export class PanelLayoutModule {
}
