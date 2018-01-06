import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiClientService } from '../core/api-client.service';
import { LiNotificationsService } from '../core/li-notifications.service';
import { LiNotification } from '../core/li-notification';

import { animate, style, transition, trigger } from '@angular/animations';
import { Subject, Observable } from 'rxjs/Rx';

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

    pageTitle: string = '';
    isLoading: boolean = false;

    currentNotification: any = null;

    pollingText: string = '';
    showRepair: boolean = false;

    showRepairNotification = false;

    infinitePolling: Subject<boolean>;

    domain: string = '';

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private apiService: ApiClientService,
                private notificationsService: LiNotificationsService) {

        this.apiService.get('/api/network/domain/')
            .subscribe((data) => {
                this.domain = data.domain;
            });

        apiService.get('/api/users/whoami/')
            .subscribe((data) => {

                if (!data.is_authenticated) {
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
            }
        });

        apiService.subscribe([
            ApiClientService.EV_BEFORE_PUT,
            ApiClientService.EV_BEFORE_POST
        ], () => {
            this.showRepairNotification = false;
        });

        apiService.subscribe([
            ApiClientService.EV_BEFORE_GET,
            ApiClientService.EV_BEFORE_PUT,
            ApiClientService.EV_BEFORE_POST
        ], () => {
            this.isLoading = true;

            this.pollingText = '';
            this.showRepair = false;

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

        // create infinite polling on the page
        this.infinitePolling = new Subject();
        this.infinitePolling
            .switchMap(
                paused => paused
                    ? Observable.never()
                    : this.apiService.infinitePolling()
            )
            .subscribe();

        this.infinitePolling.next(false);

        // whenever polling started via a request we need to pause the infinite polling
        this.apiService.subscribe(ApiClientService.EV_POLLING_CUD_STARTED, () => {
            this.isLoading = true;
            this.infinitePolling.next(true);
        });

        // whenever polling stopped via a request we need to pause the infinite polling
        this.apiService.subscribe(ApiClientService.EV_POLLING_CUD_STOPPED, () => {
            this.isLoading = false;
            this.infinitePolling.next(false);
        });

        this.apiService.subscribe(ApiClientService.EV_POLLING_STATUS, (data) => {

            if (this.showRepairNotification) {
                return;
            }

            if (data) {

                this.isLoading = data.status !== 'ok';
                this.showRepair = data.status === 'broken';

                if (data.detail) {
                    this.pollingText = data.detail;
                }
            } else {
                this.isLoading = true;
                this.showRepair = false;
                this.pollingText = 'System is reconfiguring.';
            }

        });

        this.apiService.subscribe(ApiClientService.EV_POLLING_ERROR, () => {
            this.showRepair = true;
            this.pollingText = 'Sorry about that. You should click on Repair';
        });

        apiService.subscribe(ApiClientService.EV_API_ERROR, (error) => {
            setTimeout(() => {
                this.currentNotification = notificationsService
                    .show(error.detail || 'A server error has occurred.', LiNotification.TYPE_DANGER);
            }, 1000);
        });
    }

    repairConfig() {
        this.showRepair = false;
        this.showRepairNotification = false;
        this.infinitePolling.next(true);

        this.apiService
            .post('/api/configure/repair/')
            .subscribe((response: any) => {
                this.pollingText = response.detail;
            });
    }

    showFixNotification() {
        this.isLoading = false;
        this.showRepair = false;
        this.showRepairNotification = true;
    }
}
