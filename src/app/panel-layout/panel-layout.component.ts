import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiClientService } from '../core/api-client.service';
import { LiNotificationsService } from '../core/li-notifications.service';
import { LiNotification } from '../core/li-notification';

import { animate, style, transition, trigger } from '@angular/animations';

declare let window: any;
@Component({
    selector: 'li-layout',
    templateUrl: './panel-layout.component.html',
    styleUrls: ['./panel-layout.component.scss'],
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
export class PanelLayoutComponent {
    @Input('bgThemeColor') bgThemeColor: string = '#7197bb';

    sideMenuButtons = [];
    commonMenuButtons = [
        {
            path: 'about',
            data: {
                label: 'About',
                icon: 'fa fa-question-circle',
                pageTitle: 'About'
            }
        }
    ];

    username: string = '';
    isAdmin: boolean = false;

    subdomain = null;

    pageTitle: string = '';
    isLoading: boolean = false;

    currentNotification: any = null;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private apiService: ApiClientService,
                private notificationsService: LiNotificationsService) {

        apiService.get('/api/users/whoami/')
            .subscribe((data) => {

                if (! data.is_authenticated) {
                    window.location = '/accounts/login/?next=' + window.location.pathname;
                }

                this.username = data.username;
                this.isAdmin = data.is_admin;
            });

        this.sideMenuButtons = this.activatedRoute.routeConfig.children;

        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                let currentRouteData = this.activatedRoute.firstChild.routeConfig.data;

                this.pageTitle = currentRouteData['pageTitle'];

                if (currentRouteData.subdomain) {
                    // this.subdomain = window.location.protocol + '//' + currentRouteData.subdomain + '.' + window.location.hostname;
                    this.subdomain = window.location.protocol + '//' + window.location.hostname + '/service/' + currentRouteData.subdomain;
                    this.isLoading = true;
                }
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

    finishedLoading() {
        this.isLoading = false;
    }
}
