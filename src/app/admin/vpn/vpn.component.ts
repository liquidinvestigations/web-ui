import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './vpn.component.html',
  styleUrls: ['./vpn.component.scss']
})
export class VpnComponent {

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
