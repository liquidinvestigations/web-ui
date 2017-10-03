import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
    username: string = '';
    isAdmin: boolean = false;

    pageTitle: string = '';
    isLoading: boolean = false;


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private apiService: ApiClientService,
        private notificationsService: LiNotificationsService
    ) {

        apiService.get('/api/users/whoami')
            .map(res => res.json())
            .subscribe((data) => {
                this.username = data.username;
                this.isAdmin = data.is_admin;
            });

        this.sideMenuButtons = this.activatedRoute.routeConfig.children;

        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.pageTitle = this.activatedRoute.firstChild.routeConfig.data['pageTitle'];
            }
        });

        apiService.subscribe([
            ApiClientService.EV_BEFORE_GET,
            ApiClientService.EV_BEFORE_PUT,
            ApiClientService.EV_BEFORE_POST
        ], () => {
            this.isLoading = true;
        });

        apiService.subscribe([
            ApiClientService.EV_GET_SUCCESSFUL,
            ApiClientService.EV_PUT_SUCCESSFUL,
            ApiClientService.EV_POST_SUCCESSFUL,
            ApiClientService.EV_API_ERROR
        ], () => {
            this.isLoading = false;
        });

        apiService.subscribe([
            ApiClientService.EV_PUT_SUCCESSFUL,
            ApiClientService.EV_POST_SUCCESSFUL
        ], () => {
            notificationsService.show('Your settings have been updated', LiNotification.TYPE_SUCCESS);
        });

        apiService.subscribe(ApiClientService.EV_API_ERROR, () => {
            notificationsService.show('Oups! Could not update your settings due to some server error', LiNotification.TYPE_DANGER);
        });
    }

}
