import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './network.component.html',
    styleUrls: [
        './network.component.scss'
    ]
})
export class NetworkComponent {

    tabs = [];

    constructor(private activatedRoute: ActivatedRoute) {
        let routeChildren = this.activatedRoute.routeConfig.children;

        if (routeChildren) {
            for (let route of routeChildren) {
                if (route.path) {
                    route.data.path = './' + route.path;
                    this.tabs.push(route.data);
                }
            }
        }
    }
}
