import { Component, Input } from '@angular/core';

@Component({
    selector: 'li-tabs',
    templateUrl: 'tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
    @Input() tabs: any[];
}
