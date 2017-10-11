import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'li-progressbar',
    templateUrl: './progressbar.component.html',
    styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

    @Input('total') total;
    @Input('step') step;

    bulletSpace = 0;
    progressSlice = 0;

    steps = [];

    constructor() {}

    ngOnInit() {
        this.bulletSpace = 100 / this.total;
        this.progressSlice = 100 / (this.total - 1);

        for (let i = 0; i < this.total; i++) {
            this.steps.push(i);
        }
    }

}
