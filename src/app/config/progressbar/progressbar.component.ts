import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'li-progressbar',
    templateUrl: './progressbar.component.html',
    styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

    @Input('total') total;
    @Input('step') step;

    width = '';
    steps = [];

    constructor() {}

    ngOnInit() {
        this.width = 100 / (this.total) + '%';
        for (let i = 0; i < this.total - 1 ; i++) {
            this.steps.push(i);
        }
    }

}
