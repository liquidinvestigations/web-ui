import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { PanelLayoutModule } from '../panel-layout/panel-layout.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(
            [
                {
                    path: '',
                    pathMatch: 'full',

                    component: ClientComponent
                }
            ]
        ),
        PanelLayoutModule,
        SharedModule,
    ],
    declarations: [
        ClientComponent,
    ]
})
export class ClientModule {
}
