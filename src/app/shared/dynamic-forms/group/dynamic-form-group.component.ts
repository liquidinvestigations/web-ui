import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormService } from '../dynamic-form.service';
import { DynamicElement } from '../elements/dynamic-element';

declare let _: any;

@Component({
    selector: 'dynamic-form-group',
    templateUrl: './dynamic-form-group.component.html',
})
export class DynamicFormGroupComponent implements OnInit {
    @Input() formGroup: FormGroup;
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

            if (!this.formGroup.controls[group.id]) {
                let path = this.lastPath.slice().concat([group.id]);

                this.formGroup.addControl(group.id,
                    this.dynamicFormService.createGroup(
                        group._elementsArray,
                        path
                    )
                );

                this.chainPath = path;
            }

            return true;
        }

        return false;
    }

    isDynamicElement(element: DynamicElement): boolean {
        if (element instanceof DynamicElement) {
            if (!this.formGroup.controls[element.id]) {

                this.formGroup.addControl(
                    element.id,
                    this.dynamicFormService.createElement(element, this.chainPath)
                );
            }
            return true;
        }
        return false;
    }

    getElements() {
        return this.dynamicFormGroup._elementsArray;
    }
}
