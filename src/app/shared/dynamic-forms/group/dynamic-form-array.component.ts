import { Component, Input, ChangeDetectorRef, OnInit, EventEmitter, Output } from '@angular/core';
import { DynamicFormArray } from './dynamic-form-array';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DynamicElement } from '../elements/dynamic-element';
import { DynamicFormGroup } from './dynamic-form-group';

@Component({
    selector: 'dynamic-form-array',
    templateUrl: './dynamic-form-array.component.html'
})
export class DynamicFormArrayComponent implements OnInit {
    @Input() fg: FormArray;
    @Input() dynamicFormArray: DynamicFormArray;
    @Output() elementEvent: EventEmitter<any> = new EventEmitter();

    constructor(private cdRef: ChangeDetectorRef) {}

    ngOnInit() {
        let patchValue = this.fg.patchValue;
        this.fg.patchValue = (value: any, options?: Object) => {
            if (this.dynamicFormArray.elementGenerate) {
                this.fg.controls = [];
                this.dynamicFormArray._elementsArray = [];

                for (let i of value) {
                    (this.fg as FormArray).push(
                        this.expandGroup(
                            this.dynamicFormArray.elementGenerate
                        )
                    );
                    this.dynamicFormArray._elementsArray.push(this.dynamicFormArray.elementGenerate);
                }
                this.cdRef.detectChanges();
            }

            patchValue.apply(this.fg, [value, options]);
        };
    }

    expandGroup(element: (DynamicFormGroup | DynamicElement)) {
        let fb = new FormBuilder();
        let builtForm = {};

        if (element instanceof DynamicElement) {
            builtForm[element.id] = [element.value, element.validators];
        }
        return fb.group(builtForm);
    }

    maxLimitReached() {
        return this.dynamicFormArray._elementsArray.length ==
            this.dynamicFormArray.maxAddLimit;
    }

    handleRemove($event: string, i) {
        if ($event === 'input-remove') {
            this.dynamicFormArray._elementsArray.splice(i, 1);
            (this.fg as FormArray).removeAt(i);
        }
    }

    addNew() {
        if (
            this.dynamicFormArray._elementsArray.length <=
            this.dynamicFormArray.maxAddLimit
        ) {
            (this.fg as FormArray).push(
                this.expandGroup(
                    this.dynamicFormArray.elementGenerate
                )
            );

            this.dynamicFormArray._elementsArray.push(this.dynamicFormArray.elementGenerate);
        }
    }


    emitEvent($event, i) {
        this.handleRemove($event, i);
        this.elementEvent.emit($event);
    }
}
