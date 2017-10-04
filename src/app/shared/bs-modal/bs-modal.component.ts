import { Component, ElementRef, Input } from '@angular/core';

declare let $: any;

@Component({
    selector: 'bs-modal',
    templateUrl: './bs-modal.component.html'
})
export class BsModalComponent {

    @Input() callbacks: Function[];

    constructor(private elRef: ElementRef) {
    }

    show() {
        $(this.elRef.nativeElement).find('.modal').modal('show');
    }

    hide() {
        $(this.elRef.nativeElement).find('.modal').modal('hide');
    }

    ngOnInit() {
        if (this.callbacks) {
            for (let ev in ['show', 'shown', 'hide', 'hidden']) {
                if (this.callbacks[ev] && this.callbacks[ev] instanceof Function) {
                    $(this.elRef.nativeElement).find('.modal').on(`show.${ev}.modal`, this.callbacks[ev]);
                }
            }
        }
    }
}
