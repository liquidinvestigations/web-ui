import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './sidebar/side-menu.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        SideMenuComponent,
        NavbarComponent
    ],
    exports: [
        SideMenuComponent,
        NavbarComponent
    ]
})
export class PanelLayoutModule {
}
