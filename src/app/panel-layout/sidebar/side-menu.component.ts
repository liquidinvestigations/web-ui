import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'li-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: [
        './side-menu.component.scss'
    ]
})
export class SideMenuComponent implements OnInit {
    @Input() sideMenuButtons: any[];
    @Input() parentPath: string = './';
    @Input() childrenAsTabs: boolean = true;
    @Input() disabled: boolean = false;

    buttons: any[] = [];

    ngOnInit() {
        for (let route of this.sideMenuButtons) {
            if (route.data && !route.data.abstract) {
                route.data.path = this.parentPath + '/' + route.path;
                if (!this.childrenAsTabs) {
                    route.data.children = route.children;
                }
                this.buttons.push(route.data);
            }
        }
    }
}
