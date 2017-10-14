import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiClientService } from '../core/api-client.service';
import { LiNotificationsService } from '../core/li-notifications.service';
import { LiNotification } from '../core/li-notification';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger(
            'inOutAnimation', [
                transition(':enter', [
                    style({opacity: 0}),
                    animate('500ms', style({opacity: 1}))
                ]),
                transition(':leave', [
                    style({opacity: 1}),
                    animate('200ms', style({opacity: 0}))
                ])
            ]
        )
    ]
})
export class AdminComponent {
    sideMenuButtons = [];
    username: string = '';
    isAdmin: boolean = false;

    pageTitle: string = '';
    isLoading: boolean = false;

    currentNotification: any = null;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private apiService: ApiClientService,
                private notificationsService: LiNotificationsService) {

        apiService.get('/api/users/whoami/')
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
            if (this.currentNotification) {
                this.currentNotification.close();
            }
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
            setTimeout(() => {
                this.currentNotification = notificationsService
                    .show('Your settings have been updated', LiNotification.TYPE_SUCCESS);
            }, 1000);

        });

        apiService.subscribe(ApiClientService.EV_API_ERROR, (error) => {
            setTimeout(() => {
                this.currentNotification = notificationsService
                .show(error.detail || 'A server error has occurred.', LiNotification.TYPE_DANGER);
            }, 1000);

        });
    }

}
