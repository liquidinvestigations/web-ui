import { Input, Directive, ElementRef } from '@angular/core';

declare let vanillaTextMask: any;

/**
 * Wrapper for https://www.npmjs.com/package/vanilla-text-mask
 */
@Directive({
    selector: '[textMask]',
})
export class DynamicControlMaskDirective {

    @Input('textMask')
    set textMask(mask: (string | RegExp)[]) {

        if (typeof vanillaTextMask !== 'undefined' && mask.length) {
            vanillaTextMask.maskInput({
                inputElement: this.elRef.nativeElement,
                showMask: true,
                guide: false,
                placeholderChar: '_',
                pipe: undefined,
                keepCharPositions: false,
                mask: mask
            });
        }

    }

    constructor(private elRef: ElementRef) {
    }

}
