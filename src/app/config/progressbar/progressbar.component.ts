import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'li-progressbar',
    templateUrl: './progressbar.component.html',
    styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

    @Input('total') total;
    @Input('step') step;

    width = 0;
    width2 = 0;

    steps = [];

    constructor() {}

    ngOnInit() {
        this.width = 100 / this.total;
        this.width2 = 100 / (this.total - 1);

        for (let i = 0; i < this.total; i++) {
            this.steps.push(i);
        }
    }

}
