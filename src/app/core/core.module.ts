import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApiClientService } from './api-client.service';
import { NotificationsService } from './notifications.service';
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
        NotificationsService
    ]
})
export class CoreModule {}
