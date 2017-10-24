import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

declare let $: any;
@Component({
    selector: 'li-iframe',
    template: '<iframe [src]="src | trust" [style.height]="height"></iframe>'
})
export class IframeComponent {
    @Input() src: string;
    @Output() loaded: EventEmitter<any> = new EventEmitter();

    height: string = 'auto';

    constructor(private elRef: ElementRef) {
    }

    ngOnInit() {
        let iframe = $(this.elRef.nativeElement).find('iframe')[0];

        iframe.onload = () => {
            this.height = iframe.contentWindow.outerHeight + 'px';
            this.loaded.emit();
        };
    }
}
