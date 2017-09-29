import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './sidebar/side-menu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        SideMenuComponent
    ],
    exports: [
        SideMenuComponent,
    ]
})
export class PanelLayoutModule {
}
