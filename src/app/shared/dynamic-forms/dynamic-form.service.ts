import { Injectable } from '@angular/core';
import { DynamicFormControl } from './builder/dynamic-form-control';
import { DynamicFormArray } from './builder/dynamic-form-array';

@Injectable()
export class DynamicFormService {

    public defaults = {
        labelCssClass: 'col-xs-12',
        controlCssClass: 'col-xs-12',
    };
    private elementsReference = {};

    addElementReference(control: DynamicFormControl) {
        if (control.parent instanceof DynamicFormArray) {
            if (!this.elementsReference[control.parent.id]) {
                this.elementsReference[control.parent.id] = {
                    array: control,
                    children: {}
                };
            }
            this.elementsReference[control.parent.id]['children'][control.id] = control;
        } else {
            this.elementsReference[control.id] = control;
        }
    }

    removeElementRefference(control: DynamicFormControl) {
        if (control.parent instanceof DynamicFormArray) {
            delete this.elementsReference[control.parent.id]['children'][control.id];
        } else {
            delete this.elementsReference[control.id];
        }
    }

    getElementsRefference() {
        return this.elementsReference;
    }


    getControlRef(name: string): ( DynamicFormArray ) {
        return this.elementsReference[name];
    }

    setControlCssClass(cssClass: string) {
        this.defaults['controlCssClass'] = cssClass;
        return this;
    }

    setLabelCssClass(labelCssClass: string) {
        this.defaults['labelCssClass'] = labelCssClass;
        return this;
    }

    setRenderer(renderer: any) {
        this.defaults['renderer'] = renderer;
        return this;
    }

}
