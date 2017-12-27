import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './sidebar/side-menu.component';
import { PanelLayoutComponent } from './panel-layout.component';
import { TabsComponent } from './tabs/tabs.component';
import { TableListComponent } from './table-list/table-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        SideMenuComponent,
        TabsComponent,
        PanelLayoutComponent,
        TableListComponent,
    ],
    exports: [
        TabsComponent,
        PanelLayoutComponent,
        TableListComponent,
    ]
})
export class PanelLayoutModule {
}
