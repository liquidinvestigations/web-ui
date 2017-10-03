import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './network.component.html'
})
export class NetworkComponent {

    tabs = [];

    constructor(private activatedRoute: ActivatedRoute) {

        console.log(this.activatedRoute);

        let routeChildren = this.activatedRoute.routeConfig.children;

        if (routeChildren) {
            let parentPath = activatedRoute.routeConfig.path;

            for (let route of routeChildren) {
                if (route.path) {
                    route.data.path = './' + route.path;
                    this.tabs.push(route.data);
                }
            }
        } else {
            this.tabs = [];
        }


    }
}
