import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'li-side-menu',
    templateUrl: './side-menu.component.html'
})
export class SideMenuComponent implements OnInit {
    @Input() sideMenuButtons: any[];
    @Input() parentPath: string = './';

    buttons: any[] = [];

    ngOnInit() {
        for (let route of this.sideMenuButtons) {
            if (route.data) {
                route.data.path = this.parentPath + '/' + route.path;
                route.data.children = route.children;
                this.buttons.push(route.data);
            }
        }
    }
}
