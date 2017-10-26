import { Component } from '@angular/core';

declare let window: any;

@Component({
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
    goBack() {
        window.history.back(-1);
    }
}
