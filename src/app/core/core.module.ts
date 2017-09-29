import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApiClientService } from './api-client.service';
import { LiNotificationsService } from './li-notifications.service';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
    ],
    declarations: [
    ],
    providers: [
        ApiClientService,
        LiNotificationsService
    ]
})
export class CoreModule {}
