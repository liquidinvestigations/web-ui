import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ElementBase } from './definitions/element.base';

@Component({
    selector: 'li-element',
    templateUrl: './element.component.html'
})
export class ElementComponent {
    @Input() element: ElementBase<any>;
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.element.key].valid; }
}
