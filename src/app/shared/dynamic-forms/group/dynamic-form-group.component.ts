import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormService } from '../dynamic-form.service';
import { DynamicElement } from '../elements/dynamic-element';
import { DynamicFormArray } from './dynamic-form-array';

@Component({
    selector: 'dynamic-form-group',
    templateUrl: './dynamic-form-group.component.html',
})
export class DynamicFormGroupComponent implements OnInit {
    @Input() fg: FormGroup;
    @Input() dynamicFormGroup: DynamicFormGroup;

    @Input() chainPath: string[] = [];
    private lastPath = [];

    constructor(public dynamicFormService: DynamicFormService) {
    }

    ngOnInit() {
        this.lastPath = this.chainPath;
    }

    isDynamicGroup(group: DynamicFormGroup): boolean {
        this.chainPath = this.lastPath;
        if (group instanceof DynamicFormGroup) {

            if (!this.fg.controls[group.id]) {
                let path = this.lastPath.slice().concat([group.id]);

                this.fg.addControl(group.id,
                    this.dynamicFormService.createGroup(
                        group,
                        path
                    )
                );

                this.chainPath = path;
            }

            return true;
        }

        return false;
    }

    isDynamicArray(array: DynamicFormArray): boolean {
        if (array instanceof DynamicFormArray) {
            if (!this.fg.controls[array.id]) {

                this.fg.addControl(array.id,
                    this.dynamicFormService.createArray(
                        array,
                        this.lastPath.slice()
                    )
                );
            }
            return true;
        }
        return false;
    }

    isDynamicElement(element: DynamicElement): boolean {
        if (element instanceof DynamicElement) {
            if (!this.fg.controls[element.id]) {
                this.fg.addControl(
                    element.id,
                    this.dynamicFormService.createElement(element, this.chainPath)
                );
            }
            return true;
        }
        return false;
    }

    getFields() {
        return this.dynamicFormGroup._elementsArray;
    }
}
