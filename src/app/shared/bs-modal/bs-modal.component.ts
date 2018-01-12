import { Component, ElementRef, Input } from '@angular/core';

declare let $: any;

@Component({
    selector: 'bs-modal',
    templateUrl: './bs-modal.component.html'
})
export class BsModalComponent {
    @Input() callbacks: Function[];
    @Input() defaultCloseBtn: boolean = true;

    constructor(private elRef: ElementRef) {
    }

    show(noClose?: boolean) {
        let $modal = $(this.elRef.nativeElement).find('.modal');

        if (noClose) {
            $modal.modal({
                backdrop: 'static',
                keyboard: false
            });
        }

        $modal
            .modal('show')
            .on('shown.bs.modal', () => {
                setTimeout(() => {
                    $modal.find('input[type="text"]:enabled, input[type="password"]:enabled').first().trigger('focus');
                }, 10);
            });
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
