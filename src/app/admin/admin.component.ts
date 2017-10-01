import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../core/api-client.service';
import { LiNotificationsService } from '../core/li-notifications.service';
import { LiNotification } from '../core/li-notification';

@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminComponent {
    sideMenuButtons = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private apiService: ApiClientService,
        private notificationsService: LiNotificationsService
    ) {
        this.sideMenuButtons = this.activatedRoute.routeConfig.children;


        apiService.subscribe([
            ApiClientService.EV_PUT_SUCCESSFUL,
            ApiClientService.EV_POST_SUCCESSFUL
        ], () => {
            notificationsService.show('Your settings have been updated', LiNotification.TYPE_SUCCESS);
        });
    }

}
