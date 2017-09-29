import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../core/notifications.service';
import { AdminEntity } from './admin.entity';

@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {


    sideMenuButtons = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private adminEntity: AdminEntity,
        private notifications: NotificationsService
    ) {
        this.sideMenuButtons = this.activatedRoute.routeConfig.children;
    }

    ngOnInit(): void {
        // setTimeout(() => {
        //     this.notifications.show('YEY IT WORKS');
        // }, 1000);
        //
        // setTimeout(() => {
        //     this.notifications.show('YEY IT WORKS');
        // }, 2000);
    }
}
