import { DynamicElement } from '../dynamic-element';
import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from '../../dynamic-form.service';

export abstract class DynamicElementRendererBase implements OnInit {
    @Input() abstract element: DynamicElement;
    @Input() abstract fg: FormGroup;
    @Output() elementEvent: EventEmitter<any> = new EventEmitter();

    constructor(protected dynamicFormService: DynamicFormService) {}

    ngOnInit() {
        this.dynamicFormService.registerHandlers(this.element);
        this.dynamicFormService.addGetterArguments(this.element);
    }

    switchToText(element: DynamicElement) {
        if (this.fg.controls[this.element.id].enabled) {
            element.setType(
                this.element.controlType === DynamicElement.TYPE_PASSWORD
                    ? DynamicElement.TYPE_TEXT
                    : DynamicElement.TYPE_PASSWORD
            );
        }
    }

    emitEvent($event) {
        this.elementEvent.emit($event);
    }
}
