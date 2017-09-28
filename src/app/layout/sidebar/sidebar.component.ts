import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: 'status', title: 'Status', icon: 'dashboard', class: ''},

    {path: 'network', title: 'Status', icon: 'dashboard', class: ''},
    {path: 'lan', title: 'Status', icon: 'dashboard', class: ''},
    {path: 'wan', title: 'Status', icon: 'dashboard', class: ''},

    {path: 'services', title: 'Status', icon: 'dashboard', class: ''},
    {path: 'ssh', title: 'Status', icon: 'dashboard', class: ''},

    {path: 'users', title: 'Status', icon: 'dashboard', class: ''},
    {path: 'discovery', title: 'Status', icon: 'dashboard', class: ''},
];

@Component({
    selector: 'li-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }
}
