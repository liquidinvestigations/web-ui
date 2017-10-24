import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiClientService } from '../core/api-client.service';
import { LiNotificationsService } from '../core/li-notifications.service';
import { LiNotification } from '../core/li-notification';
import { animate, style, transition, trigger } from '@angular/animations';

declare let window: any;

@Component({
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
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
export class ClientComponent {
    sideMenuButtons = [];
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
                    let path  = this.activatedRoute.firstChild.routeConfig.path;
                    this.router.navigate(['/login']);
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
                } else {
                    this.subdomain = null;
                    this.isLoading = false;
                }
            }
        });

        apiService.subscribe([
            ApiClientService.EV_BEFORE_GET,
        ], () => {
            this.isLoading = true;
            if (this.currentNotification) {
                this.currentNotification.close();
            }
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
