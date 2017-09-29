import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminComponent {


    sideMenuButtons = [];

    constructor(
        private activatedRoute: ActivatedRoute,
    ) {
        this.sideMenuButtons = this.activatedRoute.routeConfig.children;
    }

}
