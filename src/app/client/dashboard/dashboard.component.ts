import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    pages = [];

    constructor(
        private activatedRoute: ActivatedRoute,
    ) {
        let routeConfig = this.activatedRoute.parent.routeConfig.children;

        this.pages = routeConfig.filter((route) => route.path && route.path !== 'dashboard');

        console.log(this.pages);
    }

}
